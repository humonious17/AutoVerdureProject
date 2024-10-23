import updateProductsCache from "@/lib/server/updateProductsCache";

let productCache = null;

export default async function findProduct(productId, productType = false) {
    try {
        if (!productCache) {
            const result = await updateProductsCache();
            if (result) {
                productCache = result;
                console.log("Product Cache updated:", productCache);
            } else {
                console.error("Failed to update product cache");
                return null;
            }
        }

        return findProductInCache(productId, productType);
    } catch (error) {
        console.error("Error in findProduct:", error);
        return null;
    }
}

function findProductInCache(productId, productType) {
    if (!productCache) {
        console.error("Product cache is not initialized");
        return null;
    }

    if (productType) {
        const currentProducts = productCache[productType];
        if (!currentProducts) {
            console.error(`No products found for type: ${productType}`);
            return null;
        }
        return currentProducts.find(product => product.productId === productId) || null;
    } else {
        const allProducts = Object.values(productCache).flat();
        return allProducts.find(product => product.productId === productId) || null;
    }
}