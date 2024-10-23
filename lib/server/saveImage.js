import cloudinary from "cloudinary";
import streamifier from 'streamifier';
import {db} from "/pages/api/firebaseAdmin"
import crypto from "crypto";

async function uploadImage(imageBytes) {
    const imageId = crypto.randomBytes(8).toString('hex');
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const buffer = Buffer.from(imageBytes);
        const publicUrl = await (
            new Promise((res, rej) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream(
                    { folder: 'images', public_id: imageId},
                    (error, result) => {
                        if (error) {
                            return rej(error);
                        }
                        return res(result.secure_url);
                    }
                )

                streamifier.createReadStream(buffer).pipe(uploadStream);
            })
        )

        try {
            if (!publicUrl) {
                return false;
            }
            await db.collection('images').doc(imageId).set({ imageId: imageId, publicUrl: publicUrl})
            return imageId;
        } catch (error) {
            console.log(error);
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default uploadImage;