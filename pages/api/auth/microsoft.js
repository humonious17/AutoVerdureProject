// pages/api/auth/microsoft.js
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const state = uuidv4();
    res.setHeader(
      "Set-Cookie",
      `auth_state=${state}; Path=/; HttpOnly; SameSite=Lax`
    );

    // Use 'common' endpoint instead of specific tenant ID to allow any Microsoft account
    const params = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID,
      response_type: "code",
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/microsoft/callback`,
      scope: "openid profile email offline_access User.Read",
      state: state,
      response_mode: "query",
    });

    // Use 'common' tenant instead of specific tenant ID
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
    res.redirect(authUrl);
  } catch (error) {
    console.error("Microsoft auth initialization error:", error);
    res.redirect("/signin?error=auth_init_failed");
  }
}

