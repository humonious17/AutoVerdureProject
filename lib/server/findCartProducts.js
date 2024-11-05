import findProduct from "@/pages/api/products/findProduct";
import { db } from "@/pages/api/firebaseAdmin";

export default async function findCartProducts(cartId) {
    try {
        if (!cartId) {
            return [];
        }

        const products = [];
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
        });

        for (const cartObjId of cartObjIds) {
            const docRef = db.collection('cartObjs').doc(cartObjId);
            
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
                const cartObj = docSnapshot.data();
                const productId = cartObj.productId || '';
                const productQty = parseInt(cartObj.productQty) || 1;
                const productPrice = parseInt(cartObj.productPrice) || 0; // Get price from cartObj

                // Fetch product data
                const productData = await findProduct(productId);

                if (productData) {
                    // Include cartObjId and price from cartObj in the product data
                    const productToAdd = {
                        cartObjId: cartObjId,
                        productId: String(productId),
                        productQty: productQty,
                        productImage: productData.productImages?.[0] || '/default-image.png',
                        productName: productData.productName || 'Unnamed Product',
                        price: productPrice // Use price from cartObj instead of product data
                    };
                    console.log("Found cart product:", {
                        name: productData.productName,
                        cartObjId: cartObjId,
                        price: productPrice
                    });
                    products.push(productToAdd);
                }
            }
        }

        return products;
    } catch (error) {
        console.error("Error fetching cart products:", error);
        return [];
    }
}