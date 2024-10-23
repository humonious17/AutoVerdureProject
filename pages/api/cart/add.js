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

async function addToCart(cartId, productId, productColor, productSize, stockQuantity) {
    try {
        const cartObjId = crypto.randomBytes(8).toString('hex');
        await db.collection('cartObjs').doc(cartObjId).set({
            cartObjId: cartObjId,
            productId: productId,
            productColor: productColor,
            productSize: productSize,
            productQty: stockQuantity
        });

        if (cartId) {
            try {
                await db.collection('carts').doc(cartId).update({
                    cartObjIds: admin.firestore.FieldValue.arrayUnion(cartObjId),
                });
                return cartId;
            } catch (error) {
                await db.collection('carts').doc(cartId).set({
                    cartId: cartId,
                    cartObjIds: [cartObjId],
                });
                return cartId;
            }
        } else {
            let id = crypto.randomBytes(8).toString('hex')
            await db.collection('carts').doc(id).set({
                cartId: id,
                cartObjIds: [cartObjId]
            })
            return id;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {productId, productColor, productSize, productQuantity} = req.body;
        const cartId = findCartId(req);
        const result = await addToCart(cartId, productId, productColor, productSize, productQuantity);

        if (result) {
            setCookie(res, result);
            const cartProducts = await findCartProducts((cartId || result));
            return res.status(200).json({cartProducts: cartProducts});
        } else {
            return res.status(500).json({error: 'Something went wrong while adding to cart'});
        }

    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
}