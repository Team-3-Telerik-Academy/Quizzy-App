import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByUsername = (username) => {

    return get(ref(db, `users/${username}`));
};

export const createUserUsername = (username, uid, email, firstName, lastName, phone) => {

    return set(ref(db, `users/${username}`), { username: username, uid, email, firstName, lastName, phone, createdOn: new Date()})
};

export const getUserData = (prop) => {

    return get(query(ref(db, 'users'), orderByChild(prop), equalTo(prop)));
};