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

    // Updated scope to include all required permissions
    const params = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID,
      response_type: "code",
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/microsoft/callback`,
      scope: "openid profile email offline_access User.Read",
      state: state,
      response_mode: "query",
    });

    const authUrl = `https://login.microsoftonline.com/${
      process.env.MICROSOFT_TENANT_ID
    }/oauth2/v2.0/authorize?${params.toString()}`;
    res.redirect(authUrl);
  } catch (error) {
    console.error("Microsoft auth initialization error:", error);
    res.redirect("/signin?error=auth_init_failed");
  }
}
