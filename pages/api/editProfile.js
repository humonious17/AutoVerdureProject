import currentUser from "@/lib/server/currentUser";
import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await currentUser(req);

            if (!user) {
                return res.status(401).json({ error: 'Unauthorized: No session token provided' });
            }

            const userMail = user.email;
            const data = JSON.parse(req.body);

            const fname = data.firstName;
            const lname = data.lastName;
            const phone = data.phone
            const userQuerySnapshot = await db.collection('users').doc(userMail).get();

            if (userQuerySnapshot.exists) {
                await db.collection('users').doc(userMail).update({
                    username: (fname + ' ' + lname), 
                    lastName: lname, 
                    phone: phone
                })
                return res.status(200).json({message: 'User updating'})
            } else {
                return res.status(404).json({error: 'User not found'});
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Something went wrong"})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}