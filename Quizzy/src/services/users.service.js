import { onValue, get, set, update, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getAllUsers = async () => {

    const snapshot = await get(ref(db, `users/`));
    const arrayOfAllUsers = Object.keys(snapshot.val()).map(el => snapshot.val()[el]);

    return arrayOfAllUsers;
};

export const getUserByUsername = (username) => {

    return get(ref(db, `users/${username}`));
};

export const createUserUsername = (username, uid, email, firstName, lastName, phone, role) => {

    return set(ref(db, `users/${username}`), { username: username, uid, email, firstName, lastName, phone, role: role, image: 'https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/user.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d', createdOn: new Date().toString(), isAdmin: false })
};

export const getUserData = (prop, propValue) => {

    return get(query(ref(db, 'users'), orderByChild(prop), equalTo(propValue)));
};

export const listenForUserChanges = (username, callback) => {
    const userRef = ref(db, `users/${username}`);

    onValue(userRef, (snapshot) => {
        callback(snapshot.val());
    });
};

export const updateUserInfo = async (username, prop, value, fn) => {
    const userRef = ref(db, `users/${username}`);
    await update(userRef, { [prop]: value });
    listenForUserChanges(username, fn)
};