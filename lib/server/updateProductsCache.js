import { db } from "/pages/api/firebaseAdmin";

async function findProductImages(productId) {
  if (!productId) {
    console.warn("Product ID is undefined. Skipping image retrieval.");
    return [];
  }

  try {
    const productImagesRef = db.collection("productImages");
    const productImagesQuerySnapshot = await productImagesRef
      .where("productId", "==", productId)
      .get();

    if (productImagesQuerySnapshot.empty) {
      console.warn(`No images found for productId: ${productId}`);
      return [];
    }

    const productImagesArray = productImagesQuerySnapshot.docs.map((doc) =>
      doc.data()
    );
    const productImages = productImagesArray[0];

    const imageIds = [
      productImages.firstImageId,
      productImages.secondImageId,
      productImages.thirdImageId,
      productImages.fourthImageId,
      productImages.fifthImageId,
    ].filter(Boolean);

    if (!imageIds.length) {
      console.warn(`No valid imageIds found for productId: ${productId}`);
      return [];
    }

    const imagesRef = db.collection("images");
    const imagesQuerySnapshot = await imagesRef
      .where("imageId", "in", imageIds)
      .get();

    const allImages = imagesQuerySnapshot.docs
      .map((doc) => doc.data().publicUrl)
      .filter(Boolean);

    return allImages;
  } catch (error) {
    console.error(
      `Error fetching product images for productId: ${productId}`,
      error
    );
    return [];
  }
}

export default async function updateProductsCache() {
  try {
    async function fetchProductsByType(productType) {
      try {
        const productsRef = db.collection("products");
        const querySnapshot = await productsRef
          .where("productType", "==", productType)
          .get();

        const products = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            let product = doc.data();
            const imageUrls = await findProductImages(product.productId);
            product["productImages"] = imageUrls.length > 0 ? imageUrls : [];
            return product;
          })
        );

                return products;
            } catch (error) {
                console.error(`Error fetching products of type: ${productType}`, error);
                return [];
            }
        }

        const [plants, zenpots, groboxes, accessories,planters, flowers] = await Promise.all([
            fetchProductsByType('plants'),
            fetchProductsByType('zenpot'),
            fetchProductsByType('grobox'),
            fetchProductsByType('accessory'),
            fetchProductsByType('planters'),
            fetchProductsByType('flowers')
        ]);

        const productData = {
            lastUpdateTimestamp: new Date().getTime(),
            grobox: groboxes,
            plants: plants,
            zenpot: zenpots,
            accessory: accessories,
            flowers: flowers,
            planters: planters


        };

        console.log("Product data successfully fetched:", productData);
        return productData;
    } catch (error) {
        console.error("Error updating product cache:", error);
        return null;
    }
}
