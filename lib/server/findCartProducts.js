import findProduct from "@/pages/api/products/findProduct";
import { db } from "@/pages/api/firebaseAdmin";

export default async function findCartProducts(cartId) {
    try {
        if (!cartId) {
            return { data: [], error: null };
        }

        const products = [];
        const cartRef = db.collection('carts').where('cartId', '==', cartId);
        const snapshot = await cartRef.get();

        if (snapshot.empty) {
            return { data: [], error: null };
        }

        let cartObjIds = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.cartObjIds && Array.isArray(data.cartObjIds)) {
                cartObjIds = data.cartObjIds;
            }
        });

        for (const cartObjId of cartObjIds) {
            const docRef = db.collection('cartObjs').doc(cartObjId);
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
                const cartObj = docSnapshot.data();
                const productId = cartObj.productId;
                const productQty = cartObj.productQty || 1;

                // Fetch product data
                const productData = await findProduct(productId);

                if (productData) {
                    products.push({
                        productId,
                        productQty,
                        productImage: productData.productImages?.[0] || '/default-image.png',
                        productName: productData.productName || 'Unnamed Product',
                        price: Number(productData.productPrice) || 0
                    });
                }
            }
        }

        return { data: products, error: null };
    } catch (error) {
        console.error("Error fetching cart products:", error);
        return { data: [], error: "Could not fetch cart products." };
    }
}
