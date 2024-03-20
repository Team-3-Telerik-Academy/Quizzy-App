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

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all users.
 */
export const getAllUsers = async () => {
  const snapshot = await get(ref(db, `users/`));
  const arrayOfAllUsers = Object.keys(snapshot.val()).map(
    (el) => snapshot.val()[el]
  );

  return arrayOfAllUsers;
};

/**
 * Retrieves all educators from the database.
 * @returns {Promise<Array<Object>>} An array of all educator objects.
 */
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

/**
 * Retrieves all users from the database and sorts them by their total points in descending order.
 * @returns {Promise<Array<Object>>} An array of user objects sorted by total points.
 */
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

/**
 * Retrieves a user object from the database based on the provided username.
 *
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<object>} A promise that resolves to the user object.
 */
export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

/**
 * Retrieves the status of a user from the database.
 * @param {string} username - The username of the user.
 * @returns {Promise<string>} - A promise that resolves to the status of the user.
 */
export const getUsersStatus = async (username) => {
  const snapshot = await get(ref(db, `users/${username}`));
  return snapshot.val().status;
}

/**
 * Retrieves user data from the database based on the username.
 *
 * @param {string} username - The username of the user to retrieve data for.
 * @returns {Promise<any>} A promise that resolves to the user data.
 */
export const byUsername = async (username) => {
  const result = await get(ref(db, `users/${username}`));
  return result.val();
};

/**
 * Creates a new user with the provided information.
 *
 * @param {string} username - The username of the user.
 * @param {string} uid - The unique identifier of the user.
 * @param {string} email - The email address of the user.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} phone - The phone number of the user.
 * @param {string} role - The role of the user.
 * @returns {Promise} A promise that resolves when the user is created.
 */
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

/**
 * Retrieves user data based on a specified property and its value.
 *
 * @param {string} prop - The property to filter the user data by.
 * @param {any} propValue - The value to match against the specified property.
 * @returns {Promise} A promise that resolves with the user data matching the specified property and value.
 */
export const getUserData = (prop, propValue) => {
  return get(query(ref(db, "users"), orderByChild(prop), equalTo(propValue)));
};

/**
 * Listens for changes in a user's data and invokes the provided callback function with the updated data.
 *
 * @param {string} username - The username of the user to listen for changes.
 * @param {Function} callback - The callback function to be invoked with the updated user data.
 */
export const listenForUserChanges = (username, callback) => {
  const userRef = ref(db, `users/${username}`);

  onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};

/**
 * Handles the admin status of a user.
 *
 * @param {string} username - The username of the user.
 * @param {Function} fn - The callback function to be executed after updating the admin status.
 * @param {Object} user - The user object containing the current admin status.
 * @returns {Promise<Array>} - A promise that resolves to an array of all users after updating the admin status.
 */
export const handleAdmin = async (username, fn, user) => {
  const { isBlocked } = user;
  if (isBlocked) {
    return null;
  }

  await update(ref(db, `users/${username}`), { isAdmin: !user.isAdmin });
  const allUsers = Object.values(await getAllUsers());
  return fn(allUsers);
};

/**
 * Handles blocking/unblocking a user and returns updated user list.
 * @param {string} username - The username of the user to be blocked/unblocked.
 * @param {Function} fn - The callback function to be called with the updated user list.
 * @param {Object} user - The user object containing user information.
 * @returns {Promise<Array>} - A promise that resolves to an array of all users after the update.
 */
export const handleBlock = async (username, fn, user) => {
  const { isAdmin } = user;
  if (isAdmin) {
    return null;
  }

  await update(ref(db, `users/${username}`), { isBlocked: !user.isBlocked });
  const allUsers = Object.values(await getAllUsers());
  return fn(allUsers);
};

/**
 * Unblock a user by toggling the 'isBlocked' property in the database.
 * @param {string} username - The username of the user to unblock.
 * @param {Function} fn - The callback function to be called after unblocking the user.
 * @param {object} user - The user object containing the 'isBlocked' property.
 * @returns {Promise<void>} - A promise that resolves when the user is unblocked.
 */
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

/**
 * Updates the user information in the database.
 * @param {string} username - The username of the user.
 * @param {string} prop - The property to update.
 * @param {any} value - The new value for the property.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export const updateUserInfo = async (username, prop, value) => {
  const userRef = ref(db, `users/${username}`);
  await update(userRef, { [prop]: value });
};

/**
 * Accepts an invitation for a user and performs necessary updates in the database.
 *
 * @param {string} username - The username of the user accepting the invitation.
 * @param {string} prop - The property indicating the type of invitation (quizInvitations, groupInvitations, friendRequests).
 * @param {string} value - The value associated with the invitation (e.g., quiz ID, group ID, friend username).
 * @param {string} id - The ID of the quiz or group associated with the invitation.
 * @param {string} userImage - The image URL of the user accepting the invitation.
 * @returns {Promise<void>} - A promise that resolves when the updates are completed.
 */
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

/**
 * Declines an invitation for a user.
 * @param {string} username - The username of the user.
 * @param {string} prop - The property to update in the user's data.
 * @param {string} value - The value to update in the user's data.
 * @param {string} id - The ID of the quiz, group, or friend request.
 * @returns {Promise<void>} - A promise that resolves when the invitation is declined.
 */
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

/**
 * Deletes a notification from a user's data in the database.
 * @param {string} username - The username of the user.
 * @param {string} prop - The property in the user's data where the notification is stored.
 * @param {string} value - The value of the notification to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the notification is deleted.
 */
export const deleteNotification = async (username, prop, value) => {
  const userRef = ref(db, `users/${username}`);
  await update(child(userRef, prop), { [value]: null });
};

/**
 * Creates user messages in the database and navigates to a specified path.
 *
 * @param {Object} user - The user object.
 * @param {Object} sender - The sender object.
 * @param {function} navigate - The navigate function.
 * @param {string} path - The path to navigate to.
 * @returns {Promise<void>} - A promise that resolves when the messages are created and navigation is complete.
 */
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

/**
 * Sends a message from one person to another.
 * @param {string} personSendingMessage - The ID of the person sending the message.
 * @param {string} content - The content of the message.
 * @param {string} personReceivingMessage - The ID of the person receiving the message.
 * @param {string} personSendingMessageFullName - The full name of the person sending the message.
 * @param {string} personSendingMessageAvatar - The avatar of the person sending the message.
 * @returns {Promise<void>} - A promise that resolves when the message is sent successfully.
 */
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

/**
 * Sends or unsends a friend request between two users.
 * @param {Object} userSendingRequest - The user sending the friend request.
 * @param {Object} userReceivingRequest - The user receiving the friend request.
 * @param {string} action - The action to perform. Can be 'send' or 'unsend'.
 * @returns {Promise<void>} - A promise that resolves when the friend request is sent or unsent.
 */
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

/**
 * Changes the status of a user and updates the status in various locations in the database.
 * @param {Object} userData - The user data object.
 * @param {string} userData.username - The username of the user.
 * @param {Object} userData.groupsIds - The group IDs associated with the user.
 * @param {Object} userData.messages - The messages associated with the user.
 * @param {Object} userData.friends - The friends associated with the user.
 * @returns {Promise<void>} - A promise that resolves when the status is updated in the database.
 */
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
