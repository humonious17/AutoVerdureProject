import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const saveImages = async (images) => {
  const uploadedImageUrls = [];

  for (let image of images) {
    const result = await cloudinary.v2.uploader.upload(image.path, {
      folder: 'product-images', // Cloudinary folder
    });
    uploadedImageUrls.push(result.secure_url);
  }

  return uploadedImageUrls;
};

export default saveImages;
