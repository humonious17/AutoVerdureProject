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
        
        // Add new cart object
        await db.collection('cartObjs').doc(cartObjId).set({
            cartObjId,
            productId,
            productColor,
            productSize,
            productQty: productQuantity,
            productPrice, 
            productName,
        });

        if (cartId) {
            // Update existing cart
            await db.collection('carts').doc(cartId).update({
                cartObjIds: admin.firestore.FieldValue.arrayUnion(cartObjId),
            });
            return cartId;
        } else {
            // Create new cart with a new cart ID
            const newCartId = crypto.randomBytes(8).toString('hex');
            await db.collection('carts').doc(newCartId).set({
                cartId: newCartId,
                cartObjIds: [cartObjId],
            });
            return newCartId;
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { productId, productColor, productSize, productQuantity, productPrice, productName } = req.body;
        const cartId = findCartId(req);
        const result = await addToCart(cartId, productId, productColor, productSize, productQuantity, productPrice, productName);

        if (result) {
            setCookie(res, result);
            
            try {
                const cartProducts = await findCartProducts(cartId || result);
                return res.status(200).json({ cartProducts });
            } catch (fetchError) {
                console.error("Error fetching cart products:", fetchError);
                return res.status(500).json({ error: 'Error fetching updated cart products' });
            }
        } else {
            return res.status(500).json({ error: 'Something went wrong while adding to cart' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
}
