import updateProductsCache from "@/lib/server/updateProductsCache";
import currentUser from "/lib/server/currentUser";
import { db, storage } from "/pages/api/firebaseAdmin";

async function destroyProduct(productId) {
    try {
        await db.collection('products').doc(productId).delete();

        const productImagesRef = await db.collection('productImages').doc(productId).get();

        if (!productImagesRef.empty) {
            const imageIds = [];

            const productImages = productImagesRef.data();
            imageIds.push(productImages.firstImageId);
            imageIds.push(productImages.secondImageId);
            imageIds.push(productImages.thirdImageId);

            await db.collection('productsImages').doc(productId).delete();

            for (const imageId of imageIds) {
                await db.collection('images').doc(imageId).delete();
                const bucket = storage.bucket();

                await bucket.file(`images/${imageId}`).delete();
            }
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const user = await currentUser(req);

        if (!user || !user.admin) {
            res.status(403).json({error: 'Access Denied.'});
            return;
        }

        const { id } = req.query;
        
        const result = await destroyProduct(id);

        if (result) {
            await updateProductsCache();
            res.status(200).json({message: `Deleted product with ID: ${id}`});
            return ;
        } else {
            res.status(500).json({error: 'Something went wrong while deleting the product.'});
            return;
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
        return;
    }
}