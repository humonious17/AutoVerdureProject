import {parse, serialize} from 'cookie';
import { admin, db } from './firebaseAdmin';
import crypto from 'crypto';

function createSessionToken() {
    return crypto.randomBytes(32).toString('hex')
}

function setCookie(res) {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
    };

    res.setHeader('Set-Cookie', serialize('sessionToken', '', cookieOptions));
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const cookies = req.headers.cookie;
        if (cookies) {
            const tokens = parse(req.headers.cookie);
            const sessionToken = tokens.sessionToken;
            setCookie(res);

            const usersRef = db.collection('users');
            const querySnapshot = await usersRef.where('sessionToken', '==', sessionToken).get();

            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    await doc.ref.update({ sessionToken: createSessionToken() });
                });
            }
        }
        res.status(200).json({message: 'Logged out successfully'});

    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}