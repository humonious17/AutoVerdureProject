import { db } from "@/pages/api/firebaseAdmin";
import { parse } from "cookie";
import { messaging } from "firebase-admin";

function findCartId(req) {
    const cookies = req.headers.cookie;

    if (cookies) {
        const tokens = parse(cookies);
        const cartId = tokens.cartId;

        if (cartId) {
            return cartId;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

async function removeFromCart(cartId, cartObjId) {
    try {
        await db.collection('cartObjs').doc(cartObjId).delete();

        const cartRef = db.collection('carts').where('cartId', '==', cartId);
        const snapshot = await cartRef.get();

        if (snapshot.empty) {
            return [];
        }

        let cartObjIds = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.cartObjIds && Array.isArray(data.cartObjIds)) {
                cartObjIds = data.cartObjIds;
            }
        })

        const newCartObjIds = [];

        for (const id of cartObjIds) {
            if (id !== cartObjId) {
                newCartObjIds.push(id);
            }
        }

        await db.collection('carts').doc(cartId).set({
            cartId: cartId,
            cartObjIds: newCartObjIds,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {cartObjId} = req.body;
        const cartId = findCartId(req);

        if (!cartId) {
            return res.status(500).json({message: "CartId not found."});
        }

        const result = await removeFromCart(cartId, cartObjId);

        if (result) {
            return res.status(200).json({message: "Removed successfully"});
        } else {
            return res.status(500).json({message: "Something went wrong"})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
}