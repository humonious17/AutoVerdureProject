import { admin, db } from '../../pages/api/firebaseAdmin';
import { parse } from 'cookie';

async function currentUser(req) {
    const cookies = req.headers.cookie;

    if (cookies) {
        const tokens = parse(cookies);
        const sessionToken = tokens.sessionToken;

        if (sessionToken) {
            const usersRef = db.collection('users');
            const querySnapshot = await usersRef.where('sessionToken', '==', sessionToken).get();

            const users = [];
            querySnapshot.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() });
            });

            const user = users[0];
            if (!user) {
                return false
            }

            const parsedUser = {
                firstName: user.username.split(' ')[0],
                lastName: user.username.split(' ')[1],
                email: user.email,
                admin: user.admin,
            }

            return parsedUser;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

export default currentUser;