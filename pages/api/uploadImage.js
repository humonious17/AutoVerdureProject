import uploadImage from "/lib/server/saveImage";
import { db } from "/pages/api/firebaseAdmin";
import currentUser from "/lib/server/currentUser";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const user = await currentUser(req);

        if (!user || !user.admin) {
            res.status(403).json({error: 'Access Denied.'});
            return;
        }

        const { body } = req;
        const bytesValues = JSON.parse(body);
        const imageBytes = bytesValues['third'];

        if (!imageBytes) {
            res.status(400).json({ error: 'Missing imageBytes or fileName' });
            return;
        }

        const data = await uploadImage(new Uint8Array(imageBytes));
        if (!data || !data[1]) {
            res.status(400).json({error: 'Something went wrong while trying to upload to storage bucket. '});
            return
        }

        const imageId = data[0];
        const publicUrl = data[1];

        try {
            await db.collection('images').doc(imageId).set({imageId: imageId, publicUrl: publicUrl})
            res.status(200).json({imageId: imageId});
            return
        } catch (error) {
            console.log(error);
            res.status(400).json({error: 'Something went wrong while adding image url to firestore. '})
            return
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
        return;
    }
}