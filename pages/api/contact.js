import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendContactMail(details) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["autoverdure@gmail.com"],
      subject: `New Query from ${details.firstName} ${details.lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Query</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header with Logo -->
              <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #9A5CF5; border-radius: 8px;">
                <img src="https://yourdomain.com/logo.png" alt="Auto Verdure Logo" style="max-width: 200px;">
                <h1 style="color: #ffffff; margin: 10px 0 0 0; font-size: 24px;">New Contact Query</h1>
              </div>

              <!-- Customer Information -->
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #9A5CF5; margin-top: 0; font-size: 18px; border-bottom: 2px solid #9A5CF5; padding-bottom: 10px;">
                  Customer Information
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Name:</td>
                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">
                      ${details.firstName} ${details.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Email:</td>
                    <td style="padding: 8px 0; color: #333333;">
                      <a href="mailto:${
                        details.email
                      }" style="color: #9A5CF5; text-decoration: none;">
                        ${details.email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Query Type:</td>
                    <td style="padding: 8px 0; color: #333333;">
                      <span style="background-color: #9A5CF5; color: white; padding: 4px 8px; border-radius: 4px; font-size: 14px;">
                        ${details.queryType}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Query Details -->
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h2 style="color: #9A5CF5; margin-top: 0; font-size: 18px; border-bottom: 2px solid #9A5CF5; padding-bottom: 10px;">
                  Query Details
                </h2>
                <p style="color: #333333; margin: 0; white-space: pre-wrap;">${
                  details.comments
                }</p>
              </div>

              <!-- Footer -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666666;">
                <p style="margin: 0; font-size: 14px;">
                  This is an automated message from Auto Verdure's contact form.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 14px;">
                  © ${new Date().getFullYear()} Auto Verdure. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error sending contact email:", error);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "No data received" });
    }

    const result = await sendContactMail(data);

    if (result) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(500).json({
        message: "Failed to send contact email. Please try again later.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
