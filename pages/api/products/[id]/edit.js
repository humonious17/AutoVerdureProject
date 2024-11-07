/* eslint-disable import/no-anonymous-default-export */
import currentUser from "/lib/server/currentUser";
import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const productData = req.body;

    try {
      await db.collection("products").doc(id).update(productData);
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === 'POST') {
    const user = await currentUser(req);
    const { id } = req.query;

    if (!user || !user.admin) {
      res.status(403).json({ error: "Access denied." });
      return;
    }
    
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {

      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      try {
        const { productName, productDetails, productPrice, innerHeight, innerLength, type, dimensions, petFriendly, notPetFriendly, moreSunlight, lessSunlight, white, cream, lightGrey, darkGrey, black, L, XL, XS, stockQuantity } = fields;

        const productData = {
          productId: id,
          productName: productName[0],
          productType: type[0],
          productDescription: productDetails[0],
          productPrice: productPrice[0],
          innerHeight: innerHeight[0], 
          innerLength: innerLength[0],
          dimensions: dimensions[0],
          petFriendly: petFriendly[0],
          petUnfriendly: notPetFriendly[0],
          moreLight: moreSunlight[0],
          lessLight: lessSunlight[0],
          L: (L ? L[0] : 'false'),
          XL: (XL ? XL[0] : 'false'),
          XS: (XS ? XS[0] : 'false'), 
          white: (white ? white[0] : 'false'),
          cream: (cream ? cream[0] : 'false'),
          lightGrey: (lightGrey ? lightGrey[0] : 'false'),
          darkGrey: (darkGrey ? darkGrey[0] : 'false'),
          black: (black ? black[0] : 'false'),
          stockQuantity: parseInt(stockQuantity)
        }

        try {
          await db.collection('products').doc(productId).set(productData);
        } catch (error) {
          res.status(500).json({ error: `Could not upload product to the database. Error: ${error}` });
          return;
        }

        res.status(200).json({ id: productId });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an error while converting the images to bytes' });
      }

    })


  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    return;
  }
}