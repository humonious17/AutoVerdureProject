import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {orderId, signature, paymentId} = req.body;

        let hmac = crypto.createHmac('sha256', process.env.RAZORPAY_API_KEY_SECRET);
        hmac.update(orderId + "|" + paymentId);
        const createdSig = hmac.digest('hex');

        if (createdSig === signature) {
            return res.status(200).json({message: "Signature verified"});
        } else {
            return res.status(500).json({message: 'Signature was not verified'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
