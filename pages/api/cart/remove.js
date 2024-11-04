import { db } from "@/pages/api/firebaseAdmin";
import { parse } from "cookie";

function findCartId(req) {
    const cookies = req.headers.cookie;
    if (!cookies) return false;
    
    const tokens = parse(cookies);
    return tokens.cartId || false;
}

async function removeFromCart(cartId, cartObjId) {
    try {
        console.log('Removing cartObjId:', cartObjId, 'from cartId:', cartId); // Debug log

        if (!cartObjId || !cartId) {
            throw new Error('Missing required parameters');
        }

        // First verify the cartObj belongs to this cart
        const cartDoc = await db.collection('carts').doc(cartId).get();
        if (!cartDoc.exists) {
            throw new Error('Cart not found');
        }

        const cartData = cartDoc.data();
        if (!cartData.cartObjIds || !cartData.cartObjIds.includes(cartObjId)) {
            throw new Error('Item not found in cart');
        }

        // Delete the cartObj document
        await db.collection('cartObjs').doc(cartObjId).delete();

        // Update the cart's cartObjIds array
        const newCartObjIds = cartData.cartObjIds.filter(id => id !== cartObjId);
        await db.collection('carts').doc(cartId).update({
            cartObjIds: newCartObjIds
        });

        return true;
    } catch (error) {
        console.error("Error during cart removal:", error);
        throw error;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }

    try {
        const { cartObjId } = req.body;
        
        console.log('Received request with cartObjId:', cartObjId); // Debug log
        
        
        if (!cartObjId) {
            return res.status(400).json({ error: 'cartObjId is required' });
        }

        const cartId = findCartId(req);
        if (!cartId) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        await removeFromCart(cartId, cartObjId);
        return res.status(200).json({ message: "Item removed successfully" });

    } catch (error) {
        console.error('Cart removal error:', error);
        return res.status(500).json({ 
            error: 'Failed to remove item from cart',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}