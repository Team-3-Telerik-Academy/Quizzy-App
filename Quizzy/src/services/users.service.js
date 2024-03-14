import {
  onValue,
  get,
  set,
  update,
  ref,
  query,
  equalTo,
  orderByChild,
  child,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, `users/`));
  const arrayOfAllUsers = Object.keys(snapshot.val()).map(
    (el) => snapshot.val()[el]
  );

  return arrayOfAllUsers;
};

export const getAllUsersSortedByScore = async () => {
  const snapshot = await get(query(ref(db, "users"), orderByChild('totalPoints')));
  const users = [];
  snapshot.forEach((childSnapshot) => {
    users.push({
      ...childSnapshot.val(),
      key: childSnapshot.key,
    });
  });
  return users.sort((a, b) => b.totalPoints - a.totalPoints);
};

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const createUserUsername = (
  username,
  uid,
  email,
  firstName,
  lastName,
  phone,
  role
) => {
  return set(ref(db, `users/${username}`), {
    username: username,
    uid,
    email,
    firstName,
    lastName,
    phone,
    role: role,
    image:
      "https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/user.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d",
    createdOn: new Date().toString(),
    isAdmin: false,
    createdQuizzes: 0,
    takenQuizzes: {},
    totalPoints: 0,
    isBlocked: false,
    quizInvitations: {},
    groupInvitations: {},
  });
};

export const getUserData = (prop, propValue) => {
  return get(query(ref(db, "users"), orderByChild(prop), equalTo(propValue)));
};

export const listenForUserChanges = (username, callback) => {
  const userRef = ref(db, `users/${username}`);

  onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};

export const handleAdmin = async (username, fn, user) => {
  const { isBlocked } = user;
  if (isBlocked) {
    return null;
  }

  await update(ref(db, `users/${username}`), { isAdmin: !user.isAdmin });
  const allUsers = Object.values(await getAllUsers());
  return fn(allUsers);
};

export const handleBlock = async (username, fn, user) => {
  const { isAdmin } = user;
  if (isAdmin) {
    return null;
  }

  await update(ref(db, `users/${username}`), { isBlocked: !user.isBlocked });
  const allUsers = Object.values(await getAllUsers());
  return fn(allUsers);
};

export const unblockUser = async (username, fn, user) => {
  await update(ref(db, `users/${username}`), { isBlocked: !user.isBlocked });
  getAllUsers()
    .then((users) => {
      return users.filter((user) => {
        return user.isBlocked === true;
      });
    })
    .then((blockedUsers) => fn(blockedUsers));
};

export const updateUserInfo = async (username, prop, value, fn) => {
  const userRef = ref(db, `users/${username}`);
  await update(userRef, { [prop]: value });
  listenForUserChanges(username, fn);
};

export const acceptInvitation = async (username, prop, value, id, fn) => {
  const userRef = ref(db, `users/${username}`);
  await update(child(userRef, prop), { [value]: null });

  // to write for groups
  if (prop === "quizInvitations") {
    const quizRef = ref(db, `quizzes/${id}`);
    const invitedUsersRef = child(quizRef, "invitedUsers");
    await update(invitedUsersRef, {
      [username]: 'accepted',
    });
  }

  listenForUserChanges(username, fn);
};

export const declineInvitation = async (username, prop, value, id, fn) => {
  const userRef = ref(db, `users/${username}`);
  await update(child(userRef, prop), { [value]: null });

  // to write for groups
  if (prop === "quizInvitations") {
    const quizRef = ref(db, `quizzes/${id}`);
    const invitedUsersRef = child(quizRef, "invitedUsers");
    await update(invitedUsersRef, {
      [username]: 'declined',
    });
  }

  listenForUserChanges(username, fn);
};
