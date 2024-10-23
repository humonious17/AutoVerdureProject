import updateProductsCache from "@/lib/server/updateProductsCache";

let productCache = {};

export default async function findAllProducts(productType) {
    try {
        console.log(`findAllProducts called with productType: ${productType}`);

        if (!productType) {
            console.error("Product type is undefined or null");
            return [];
        }

        if (productCache[productType]) {
            console.log(`Cache hit for productType: ${productType}`);
            return productCache[productType];
        }

        console.log("Cache miss, updating cache...");
        const result = await updateProductsCache();

        if (!result || typeof result !== 'object') {
            console.error("Failed to update product cache or received invalid data");
            return [];
        }

        setProductCache(result);

        if (productCache[productType]) {
            console.log(`Returning updated data for productType: ${productType}`);
            return productCache[productType];
        } else {
            console.warn(`Product type "${productType}" not found after cache update. Returning empty result.`);
            return [];
        }
    } catch (error) {
        console.error(`Error in findAllProducts: ${error.message}`);
        return [];
    }
}

export function setProductCache(data) {
    if (data && typeof data === 'object') {
        productCache = { ...productCache, ...data };
        console.log('Product cache updated successfully');
    } else {
        console.error('Invalid product data passed to setProductCache');
    }
}