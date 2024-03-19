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
  push,
  onDisconnect,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, `users/`));
  const arrayOfAllUsers = Object.keys(snapshot.val()).map(
    (el) => snapshot.val()[el]
  );

  return arrayOfAllUsers;
};

export const getAllEducators = async () => {
  try {
    const snapshot = await get(
      query(ref(db, `users`), orderByChild("role"), equalTo("educator"))
    );
    const arrayOfAllUsers = Object.keys(snapshot.val()).map(
      (el) => snapshot.val()[el]
    );

    return arrayOfAllUsers;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsersSortedByScore = async () => {
  const snapshot = await get(
    query(ref(db, "users"), orderByChild("totalPoints"))
  );
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

export const getUsersStatus = async (username) => {
  const snapshot = await get(ref(db, `users/${username}`));
  return snapshot.val().status;
}


export const byUsername = async (username) => {
  const result = await get(ref(db, `users/${username}`));
  return result.val();
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
    groups: 0,
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

export const updateUserInfo = async (username, prop, value) => {
  const userRef = ref(db, `users/${username}`);
  await update(userRef, { [prop]: value });
};

export const acceptInvitation = async (
  username,
  prop,
  value,
  id,
  userImage
) => {
  const userRef = ref(db, `users/${username}`);
  await update(child(userRef, prop), { [value]: null });

  if (prop === "quizInvitations") {
    const quizRef = ref(db, `quizzes/${id}`);
    const invitedUsersRef = child(quizRef, "invitedUsers");
    await update(invitedUsersRef, {
      [username]: "accepted",
    });
  } else if (prop === "groupInvitations") {
    const groupRef = ref(db, `groups/${id}`);
    const invitedUsersRef = child(groupRef, "invitedUsers");
    await update(invitedUsersRef, {
      [username]: "accepted",
    });

    const membersRef = child(groupRef, "members");
    await update(membersRef, {
      [username]: userImage,
    });

    const numberOfGroups = await get(ref(db, `users/${username}/groups`));
    await update(ref(db, `users/${username}`), {
      groups: numberOfGroups.val() + 1,
    });

    const membersStatusRef = child(groupRef, "membersStatus");
    await update(membersStatusRef, {
      [username]: 'online',
    });

    const groupsIdsUserParticipatesIn = await get(
      ref(db, `users/${username}/groupsIds`)
    );

    const groupDataSnapshot = await get(groupRef);
    const groupData = groupDataSnapshot.val();
    const groupTitle = groupData.title;

    await update(ref(db, `users/${username}`), {
      groupsIds: {
        ...groupsIdsUserParticipatesIn.val(),
        [groupTitle]: id,
      },
    });
  } else if (prop === "friendRequests") {
    const friendRef = ref(db, `users/${username}/friends`);
    await update(friendRef, {
      [value]: "online",
    });

    const friendRef2 = ref(db, `users/${value}/friends`);
    await update(friendRef2, {
      [username]: "online",
    });

    const friend2Ref2 = ref(db, `users/${value}/sentFriendRequests`);
    await update(friend2Ref2, {
      [username]: null,
    });
  }
};
export const declineInvitation = async (username, prop, value, id) => {
  const userRef = ref(db, `users/${username}`);
  await update(child(userRef, prop), { [value]: null });

  if (prop === "quizInvitations") {
    const quizRef = ref(db, `quizzes/${id}`);
    const invitedUsersRef = child(quizRef, "invitedUsers");
    await update(invitedUsersRef, {
      [username]: "declined",
    });
  } else if (prop === "groupInvitations") {
    const groupRef = ref(db, `groups/${id}`);
    const invitedUsersRef = child(groupRef, "invitedUsers");
    await update(invitedUsersRef, {
      [username]: "declined",
    });
    const numberOfGroups = await get(ref(db, `users/${username}/groups`));
    await update(ref(db, `users/${username}`), {
      groups: numberOfGroups.val() - 1,
    });
    const membersStatusRef = child(groupRef, "membersStatus");
    await update(membersStatusRef, {
      [username]: null,
    });
  } else if (prop === "friendRequests") {
    const friendRef = ref(db, `users/${value}/sentFriendRequests`);
    await update(friendRef, {
      [username]: null,
    });
  }
};

export const deleteNotification = async (username, prop, value) => {
  const userRef = ref(db, `users/${username}`);
  await update(child(userRef, prop), { [value]: null });
};

export const createUserMessages = async (
  user,
  sender,
  navigate,
  path,
) => {
  await set(
    ref(db, `users/${user.username}/messages/${sender.username}`),
    {
      username: sender.username,
      image: sender.image,
      firstName: sender.firstName,
      lastName: sender.lastName,
      status: sender.status,
    }
  );

  await set(
    ref(db, `users/${sender.username}/messages/${user.username}`),
    {
      username: user.username,
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
    }
  );

  navigate(path);
};

//// send message function

export const sendMessage = async (
  personSendingMessage,
  content,
  personReceivingMessage,
  personSendingMessageFullName,
  personSendingMessageAvatar,
) => {
  try {
    const senderRef = ref(
      db,
      `users/${personSendingMessage}/messages/${personReceivingMessage}/chat/`
    );
    const receiverRef = ref(
      db,
      `users/${personReceivingMessage}/messages/${personSendingMessage}/chat/`
    );

    await push(senderRef, {
      message: content,
      day: new Date().toDateString(),
      hour: new Date().getHours(),
      minutes: new Date().getMinutes(),
      name: personSendingMessage,
    });

    await push(receiverRef, {
      message: content,
      day: new Date().toDateString(),
      hour: new Date().getHours(),
      minutes: new Date().getMinutes(),
      name: personSendingMessage,
    });

    const receiverMessageNotificationRef = ref(db, `users/${personReceivingMessage}/messageNotifications/`);
    const newReceiverNotificationRef = push(receiverMessageNotificationRef);
    await set(newReceiverNotificationRef, {
      username: personSendingMessage,
      message: content,
      fullName: personSendingMessageFullName,
      avatar: personSendingMessageAvatar,
    });

  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// // on value - not used
// export const displayMessages = async (username, personChatWith, callback) => {
//   const messageRef = ref(
//     db,
//     `users/${username}/messages/${personChatWith}/chat`
//   );

//   const chats = onValue(messageRef, (snapshot) => {
//     const result = snapshot.val();
//     callback(result);
//   });
//   return chats;
// };

// // on value - not used
// export const listenForChatUsers = (username, callback) => {
//   const userRef = ref(db, `users/${username}/messages`);
//   onValue(userRef, (snapshot) => {
//     if (snapshot.val() === null) {
//       return;
//     }
//     callback(Object.values(snapshot.val()));
//   });
// };

export const friendRequest = async (
  userSendingRequest,
  userReceivingRequest,
  action
) => {
  if (action === 'send') {
    await update(
      ref(db, `users/${userReceivingRequest.username}/friendRequests/`),
      {
        [userSendingRequest.username]: userSendingRequest.firstName + ' ' + userSendingRequest.lastName,
      }
    );
    await update(
      ref(db, `users/${userSendingRequest.username}/sentFriendRequests/`),
      {
        [userReceivingRequest.username]: true,
      }
    );
  }

  if (action === 'unsend') {
    await update(
      ref(db, `users/${userReceivingRequest.username}/friendRequests/`),
      {
        [userSendingRequest.username]: null,
      }
    );
    await update(
      ref(db, `users/${userSendingRequest.username}/sentFriendRequests/`),
      {
        [userReceivingRequest.username]: null,
      }
    );
  }
};

export const changeUserStatus = async (userData) => {
  if (!userData.username) {
    return;
  }
  update(ref(db, `users/${userData.username}`), { status: 'online' });
  onDisconnect(ref(db, `users/${userData.username}`)).update({ status: 'offline' });

  const groups = userData.groupsIds ? Object.values(userData.groupsIds) : [];
  groups.forEach((id) => {
    update(ref(db, `groups/${id}/membersStatus/`), { [userData.username]: 'online' });
    onDisconnect(ref(db, `groups/${id}/membersStatus/`)).update({ [userData.username]: 'offline' });
  });

  const messages = userData.messages ? Object.keys(userData.messages) : [];
  messages.forEach((user) => {
    update(ref(db, `users/${user}/messages/${userData.username}`), { status: 'online' });
    onDisconnect(ref(db, `users/${user}/messages/${userData.username}`)).update({ status: 'offline' });
  });

  const friends = userData.friends ? Object.keys(userData.friends) : [];
  friends.forEach((friend) => {
    update(ref(db, `users/${friend}/friends/`), { [userData.username]: 'online' });
    onDisconnect(ref(db, `users/${friend}/friends/`)).update({ [userData.username]: 'offline' });
  });
}
