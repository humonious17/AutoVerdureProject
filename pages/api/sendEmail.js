const { Resend } = require("resend");
const resend = new Resend("re_a8r8kN8P_EWbAoTCuFK9i9qTZxdQSehQt"); // Make sure to set RESEND_API_KEY in your environment

(async function () {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["testuser1.aws@gmail.com"],
      subject: "Hello World",
      html: "<strong>It works! Order Confirmation</strong>",
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();
