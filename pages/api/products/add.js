import uploadImage from "/lib/server/saveImage";
import { db } from "/pages/api/firebaseAdmin";
import currentUser from "/lib/server/currentUser";
import crypto from "crypto";
import * as formidable from 'formidable';
import fs from 'fs';
import { promisify } from 'util';
import updateProductsCache from "@/lib/server/updateProductsCache";

const readFile = promisify(fs.readFile);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const user = await currentUser(req);

        if (!user || !user.admin) {
            res.status(403).json({ error: "Access denied." });
            return;
        }

        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log("Form parsing error: ", err);
                return res.status(500).json({ error: 'Error parsing form data' });
            }
        
            console.log("Fields received: ", fields);
            console.log("Files received: ", files);
        
            try {
                const { productName, productDetails, productPrice, innerHeight, innerLength, type, dimensions, petFriendly, notPetFriendly, moreSunlight, lessSunlight, white, cream, lightGrey, darkGrey, black, L, XL, XS, S, M, stockQuantity } = fields;
                const productId = crypto.randomBytes(8).toString('hex');

                // Helper function to read image files safely
                const readImage = async (file) => {
                    if (!file || !file.length) {
                        throw new Error('No image file found.');
                    }
                    return await readFile(file[0].filepath);
                };

                const firstImageBuffer = await readImage(files.firstImage);
                const secondImageBuffer = await readImage(files.secondImage);
                const thirdImageBuffer = await readImage(files.thirdImage);
                const fourthImageBuffer = await readImage(files.fourthImage);
                const fifthImageBuffer = await readImage(files.fifthImage);

                const firstImageId = await uploadImage(Array.from(new Uint8Array(firstImageBuffer)));
                const secondImageId = await uploadImage(Array.from(new Uint8Array(secondImageBuffer)));
                const thirdImageId = await uploadImage(Array.from(new Uint8Array(thirdImageBuffer)));
                const fourthImageId = await uploadImage(Array.from(new Uint8Array(fourthImageBuffer)));
                const fifthImageId = await uploadImage(Array.from(new Uint8Array(fifthImageBuffer)));

                if (!firstImageId || !secondImageId || !thirdImageId || !fourthImageId || !fifthImageId) {
                    console.log('One or more images failed to upload');
                    res.status(500).json({ error: `Could not upload one of the images` });
                    return;
                }

                await db.collection('productImages').doc(productId).set({ productId, firstImageId, secondImageId, thirdImageId, fourthImageId, fifthImageId });

                const productData = {
                    productId,
                    productName: productName[0],
                    productType: type[0],
                    productDescription: productDetails[0],
                    productPrice: parseFloat(productPrice[0]), // Ensure this is a float
                    innerHeight: parseFloat(innerHeight[0]),
                    innerLength: parseFloat(innerLength[0]),
                    dimensions: dimensions[0],
                    petFriendly: petFriendly ? petFriendly[0] === 'true' : false,
                    petUnfriendly: notPetFriendly ? notPetFriendly[0] === 'true' : false,
                    moreLight: moreSunlight ? moreSunlight[0] === 'true' : false,
                    lessLight: lessSunlight ? lessSunlight[0] === 'true' : false,
                    L: L ? L[0] === 'true' : false,
                    XL: XL ? XL[0] === 'true' : false,
                    XS: XS ? XS[0] === 'true' : false,
                    S: S ? S[0] === 'true' : false,
                    M: M ? M[0] === 'true' : false,
                    white: white ? white[0] === 'true' : false,
                    cream: cream ? cream[0] === 'true' : false,
                    lightGrey: lightGrey ? lightGrey[0] === 'true' : false,
                    darkGrey: darkGrey ? darkGrey[0] === 'true' : false,
                    black: black ? black[0] === 'true' : false,
                    stockQuantity: parseInt(stockQuantity[0])
                };

                await db.collection('products').doc(productId).set(productData);
                await updateProductsCache();
                res.status(200).json({ id: productId });
            } catch (error) {
                console.log('Error processing request:', error);
                res.status(500).json({ error: 'An error occurred while processing the request.' });
            }
        });

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
        return;
    }
}
