import { db } from "/pages/api/firebaseAdmin";
import crypto from "crypto";
import { serialize } from "cookie";
import * as formidable from "formidable";
import bcrypt from "bcryptjs";

export const config = {
    api: {
        bodyParser: false,
    },
};

function createSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

function setCookie(res, sessionToken) {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
    };

    res.setHeader('Set-Cookie', serialize('sessionToken', sessionToken, cookieOptions));
}

async function updateUserSession(userDetails) {
    const email = userDetails.email;
    const password = userDetails.password
    try {
        const userQuerySnapshot = await db.collection('users').doc(email).get();

        if (userQuerySnapshot.exists) {
            const user = userQuerySnapshot.data()
            const hashedPassword = user.hashedPassword;

            if (!hashedPassword) {
                return false;
            }

            const result = await bcrypt.compare(password, hashedPassword);

            if (result) {
                const sessionToken = createSessionToken();
                await db.collection('users').doc(userDetails.email).update({sessionToken: sessionToken});
                return sessionToken;
            } else {
                return false
            }

        } else {    
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
            }

            const { email, password } = fields;

            const userDetails = {
                email: email[0],
                password: password[0]
            }

            const sessionToken = await updateUserSession(userDetails);

            if (!sessionToken) {
                res.status(401).json({ error: 'Something went wrong while adding session' });
            } else {
                setCookie(res, sessionToken)
                res.status(200).json({ message: 'Session created successfully' });
            }

        })
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}