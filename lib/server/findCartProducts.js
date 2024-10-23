import findProduct from "@/pages/api/products/findProduct";
import { db } from "@/pages/api/firebaseAdmin";

export default async function findCartProducts(cartId) {
    const products = [];

    try {
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

        for (const cartObjId of cartObjIds) {
            const docRef = db.collection('cartObjs').doc(cartObjId);
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
                const product = docSnapshot.data();
                const productId = product.productId;
                const productData = await findProduct(productId);

                if (productData) {
                    product['productImage'] = productData.productImages[0];
                    product['productName'] = productData.productName;
                    product['price'] = productData.productPrice;
                    products.push(product);
                }
            }
        }

        return products
    } catch (error) {
        console.log(error);
        return false;
    }
}