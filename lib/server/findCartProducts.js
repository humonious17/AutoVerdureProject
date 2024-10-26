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
        });

        for (const cartObjId of cartObjIds) {
            const docRef = db.collection('cartObjs').doc(cartObjId);
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
                const product = docSnapshot.data();
                const productId = product.productId;

                // Fetch product data
                const productData = await findProduct(productId);

                if (productData) {
                    // Ensure productImages exists and has at least one image
                    product['productImage'] = (productData.productImages && productData.productImages.length > 0)
                        ? productData.productImages[0]
                        : null;

                    product['productName'] = productData.productName || "Unnamed Product";
                    product['price'] = productData.productPrice || 0; // Default price to 0 if not available
                    products.push(product);
                }
            }
        }

        // Validate the products array to ensure it contains valid JSON
        return products.map(product => {
            // Return only the necessary properties for each product
            return {
                productImage: product.productImage,
                productName: product.productName,
                price: product.price,
            };
        });
    } catch (error) {
        console.error("Error fetching cart products:", error);
        throw new Error("Could not fetch cart products."); // Better error handling
    }
}
