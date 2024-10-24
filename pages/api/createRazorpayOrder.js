import Razorpay from "razorpay";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { products } = req.body;
        
        // Ensure products and selectedProducts exist and are arrays
        if (!products || !Array.isArray(products.selectedProducts)) {
            return res.status(400).json({ error: "Invalid products data" });
        }

        let total = 0;
        products.selectedProducts.forEach(element => {
            total += (parseInt(element.price) * parseInt(element.productQty) * 100);
        });

        var instance = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY_ID, 
            key_secret: process.env.RAZORPAY_API_KEY_SECRET
        });

        var orderResp = await instance.orders.create({
            "amount": total,
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": {}
        });

        return res.status(200).json({ id: orderResp.id });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
