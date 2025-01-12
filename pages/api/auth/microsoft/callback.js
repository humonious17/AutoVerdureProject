// pages/api/auth/microsoft/callback.js
import { v4 as uuidv4 } from "uuid";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { code, state, error: authError } = req.query;

  if (authError) {
    console.error("Microsoft auth error:", authError);
    res.redirect("/signin?error=auth_failed");
    return;
  }

  try {
    const cookies = parse(req.headers.cookie || "");

    if (state !== cookies.auth_state) {
      console.error("State mismatch");
      res.redirect("/signin?error=invalid_state");
      return;
    }

    // Use 'common' endpoint for token exchange
    const tokenUrl =
      "https://login.microsoftonline.com/common/oauth2/v2.0/token";
    const body = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID,
      client_secret: process.env.MICROSOFT_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/microsoft/callback`,
      grant_type: "authorization_code",
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const tokenData = await tokenResponse.text();

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        response: tokenData,
      });
      res.redirect("/signin?error=token_exchange_failed");
      return;
    }

    const tokens = JSON.parse(tokenData);

    // Get user info
    const userResponse = await fetch(
      "https://graph.microsoft.com/v1.0/me?$select=id,displayName,givenName,surname,mail,userPrincipalName,identities",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!userResponse.ok) {
      console.error("User info fetch failed:", await userResponse.text());
      res.redirect("/signin?error=user_info_failed");
      return;
    }

    const userData = await userResponse.json();

    // Enhanced email extraction logic for all account types
    let email = userData.mail || userData.userPrincipalName;

    // For personal Microsoft accounts, check identities
    if (!email && userData.identities) {
      const emailIdentity = userData.identities.find(
        (identity) =>
          identity.signInType === "emailAddress" ||
          identity.signInType === "personalMicrosoftAccount"
      );
      if (emailIdentity) {
        email = emailIdentity.issuerAssignedId;
      }
    }

    // Fallback if still no email
    if (!email) {
      console.error("Could not determine user email");
      res.redirect("/signin?error=email_not_found");
      return;
    }

    // Handle name fields
    const firstName =
      userData.givenName || userData.displayName?.split(" ")[0] || "";
    const lastName =
      userData.surname ||
      (userData.displayName?.split(" ").length > 1
        ? userData.displayName.split(" ").slice(1).join(" ")
        : "");

    // Create or update user in Firebase
    const { db } = await import("/pages/api/firebaseAdmin");
    const usersRef = db.collection("users");

    const sessionToken = uuidv4();

    // Use email as the unique identifier instead of Microsoft ID
    // This ensures consistent user records across different Microsoft account types
    const userDoc = await usersRef.where("email", "==", email).limit(1).get();
    const userId = userDoc.empty ? uuidv4() : userDoc.docs[0].id;

    await usersRef.doc(userId).set(
      {
        email,
        firstName,
        lastName,
        name: userData.displayName || `${firstName} ${lastName}`.trim(),
        sessionToken,
        provider: "microsoft",
        microsoftId: userData.id, // Store Microsoft ID as reference
        avPoints: 0,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // Set cookies and redirect
    res.setHeader("Set-Cookie", [
      "auth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
      `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
    ]);

    res.redirect("/profile");
  } catch (error) {
    console.error("Microsoft auth callback error:", error);
    res.redirect("/signin?error=auth_failed");
  }
}
