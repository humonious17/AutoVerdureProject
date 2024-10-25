import jwt from 'jsonwebtoken';
import { admin, db } from './firebaseAdmin';
import crypto from 'crypto';
import { serialize } from 'cookie';

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

async function addUserSession(userDetails) {
    let userData = {
        username: userDetails.name,
        email: userDetails.email,
        sessionToken: createSessionToken(),
    };

    try {
        const userQuerySnapshot = await db.collection('users').doc(userDetails.email).get();

        if (!userQuerySnapshot.empty) {
            await db.collection('users').doc(userDetails.email).update(userData);
        } else {
            userData['admin'] = false;
            await db.collection('users').doc(userDetails.email).set(userData);
        }
        return userData.sessionToken;
    } catch (error) {
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Token required.' });
        }

        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/certs');
            const { keys } = await response.json();
            const decodedToken = jwt.decode(data.credential, keys[0].n);

            if (decodedToken.aud !== '704145836182-04mlgm7nhg2n4sjqno7vlh172427g778.apps.googleusercontent.com') {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const sessionToken = await addUserSession(decodedToken);

            if (!sessionToken) {
                res.status(401).json({ error: 'Something went wrong while adding session' });
            } else {
                setCookie(res, sessionToken);
                // Here, instead of dispatching an action, you could simply set user data in your component state or pass it to the next page
                res.status(200).json({ message: 'Session created successfully', email: decodedToken.email });
            }

        } catch (e) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
