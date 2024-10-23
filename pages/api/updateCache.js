import updateProductsCache from "@/lib/server/updateProductsCache";

export default async function handler(req, res) {
    const result = await updateProductsCache();

    if (result) {
        return res.status(200).json({message: "Cache updated successfulyy"});
    } else {
        return res.status(500).json({message: "The cache was not updated"})
    }

}