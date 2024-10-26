import jwt from 'jsonwebtoken';
import { admin, db } from './firebaseAdmin';
import crypto from 'crypto';
import { serialize } from 'cookie';
import { setEmail } from '@/features/userSlice/userSlice';  // Import the action

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
        const userRef = db.collection('users').doc(userDetails.email);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            // Update existing user
            await userRef.update(userData);
        } else {
            // Create new user
            userData['admin'] = false;
            await userRef.set(userData);
        }
        return {
            sessionToken: userData.sessionToken,
            userData: {
                email: userData.email,
                username: userData.username,
                isAdmin: userData.admin || false
            }
        };
    } catch (error) {
        console.error('Error in addUserSession:', error);
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({ 
                success: false,
                error: 'Token required.' 
            });
        }

        try {
            // Verify Google OAuth token
            const response = await fetch('https://www.googleapis.com/oauth2/v3/certs');
            const { keys } = await response.json();
            const decodedToken = jwt.decode(data.credential, keys[0].n);

            // Verify client ID
            const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
            if (decodedToken.aud !== CLIENT_ID) {
                return res.status(401).json({ 
                    success: false,
                    error: 'Invalid token: client ID mismatch' 
                });
            }

            // Add user session
            const sessionResult = await addUserSession(decodedToken);

            if (!sessionResult) {
                return res.status(500).json({ 
                    success: false,
                    error: 'Failed to create user session' 
                });
            }

            // Set session cookie
            setCookie(res, sessionResult.sessionToken);

            // Return success response with user data
            return res.status(200).json({
                success: true,
                message: 'Session created successfully',
                user: {
                    email: sessionResult.userData.email,
                    username: sessionResult.userData.username,
                    isAdmin: sessionResult.userData.isAdmin
                }
            });

        } catch (error) {
            console.error('Error in authentication:', error);
            return res.status(401).json({ 
                success: false,
                error: 'Authentication failed' 
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ 
            success: false,
            error: `Method ${req.method} Not Allowed` 
        });
    }
}