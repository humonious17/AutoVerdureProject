import { db } from "@/pages/api/firebaseAdmin";
import crypto from "crypto"

async function addOrder(payload) {
    const products = [];

    payload.products.forEach(element => {
        const product = {
            productId: element.productId,
            productName: element.productName, 
        }
        products.push(product);
    });

    const orderId = crypto.randomBytes(8).toString('hex');
    let date = Date().split(' ');
    date.splice(4,5);

    const data = {
        orderId: orderId,
        ordererEmail: payload.email, 
        orderedProducts: products, 
        shippingAddress: payload.shippingAddress,
        orderTime: date.join(' '), 
        orderStatus: "Processing"
    }

    try {
        await db.collection('orders').doc(orderId).set(data);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const orderPayload = req.body;
        console.log(orderPayload);
        const result = await addOrder(orderPayload);
        if (result) {
            return res.status(200).json({message: 'Order created'});
        } else {
            return res.status(500).json({message: 'Something went wrong'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}