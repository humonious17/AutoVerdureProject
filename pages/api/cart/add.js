import { admin, db } from "@/pages/api/firebaseAdmin";
import { parse, serialize } from "cookie";
import findCartProducts from "@/lib/server/findCartProducts";
import crypto from "crypto";

function setCookie(res, cartId) {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, 
    };
    res.setHeader('Set-Cookie', serialize('cartId', cartId, cookieOptions));
}

function findCartId(req) {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokens = parse(cookies);
        return tokens.cartId || false;
    }
    return false;
}

async function addToCart(cartId, productId, productColor, productSize, productQuantity, productPrice, productName) {
    try {
        const cartObjId = crypto.randomBytes(8).toString('hex');
        await db.collection('cartObjs').doc(cartObjId).set({
            cartObjId,
            productId,
            productColor,
            productSize,
            productQty: productQuantity,
            productPrice, // Store productPrice in Firestore
            productName,
        });

        if (cartId) {
            await db.collection('carts').doc(cartId).update({
                cartObjIds: admin.firestore.FieldValue.arrayUnion(cartObjId),
            });
            return cartId;
        } else {
            const id = crypto.randomBytes(8).toString('hex');
            await db.collection('carts').doc(id).set({
                cartId: id,
                cartObjIds: [cartObjId],
            });
            return id;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { productId, productColor, productSize, productQuantity, productPrice, productName } = req.body; // Extract productPrice
        const cartId = findCartId(req);
        const result = await addToCart(cartId, productId, productColor, productSize, productQuantity, productPrice, productName);

        if (result) {
            setCookie(res, result);
            const cartProducts = await findCartProducts(cartId || result);
            return res.status(200).json({ cartProducts });
        } else {
            return res.status(500).json({ error: 'Something went wrong while adding to cart' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
}
