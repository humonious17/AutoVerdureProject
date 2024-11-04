// pages/api/sendEmail.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
//    const { email, orderId, products, total } = req.body;

    try {
        await resend.sendEmail({
          to: 'testuser1.aws@gmail.com',
          from: 'Acme <onboarding@resend.dev>',
          subject: 'Order Confirmation',
          html: '<p>This is a test email.</p>',
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message || 'Failed to send test email' });
      }
}     else {
    console.log("cooudn't send the mail");
    console.log('Sending email to:', email);
        console.log('Order ID:', orderId);
        console.log('Total Amount:', total);
        console.log('Products:', products);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
