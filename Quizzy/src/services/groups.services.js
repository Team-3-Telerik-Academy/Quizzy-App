import {
  child,
  equalTo,
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  update,
} from "firebase/database";
import { db } from "../config/firebase-config";

/**
 * Retrieves a group by its ID from the database.
 * @param {string} id - The ID of the group to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved group object.
 * @throws {Error} If the group with the specified ID does not exist.
 */
export const getGroupById = async (id) => {
  try {
    const result = await get(ref(db, `groups/${id}`));

    if (!result.exists()) {
      throw new Error(`Group with id ${id} does not exist!`);
    }

    const group = result.val();
    group.id = id;
    group.createdOn = new Date(group.createdOn);

    return group;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves all groups from the database.
 * @returns {Promise<Object>} A promise that resolves to an object containing all the groups.
 * @throws {Error} If there are no groups in the database.
 */
export const getAllGroups = async () => {
  try {
    const result = await get(ref(db, `groups/`));

    if (!result.exists()) {
      throw new Error("There are no groups!");
    }

    return result.val();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves a group by its title.
 *
 * @param {string} title - The title of the group to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the result of the retrieval.
 */
export const getGroupByTitle = async (title) => {
  try {
    const result = await get(
      query(ref(db, `groups`), orderByChild("title"), equalTo(title))
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Adds a new group to the database.
 *
 * @param {string} title - The title of the group.
 * @param {string} image - The image URL of the group. If not provided, a default image URL will be used.
 * @param {string} description - The description of the group.
 * @param {Array<string>} invitedUsers - An array of usernames of users to be invited to the group.
 * @param {string} username - The username of the user creating the group.
 * @param {string} memberImage - The image URL of the user creating the group.
 * @param {string} email - The email of the user creating the group.
 * @returns {Promise<Object>} A promise that resolves to the newly created group.
 * @throws {Error} If an error occurs while adding the group.
 */
export const addGroup = async (
  title,
  image,
  description,
  invitedUsers,
  username,
  memberImage,
  email
) => {
  try {
    const result = await push(ref(db, "groups"), {
      title,
      image:
        image ||
        "https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/group-default-image.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d",
      description,
      createdBy: username,
      createdOn: new Date().toString(),
      email: email,
      members: {
        [username]: memberImage,
      },
      membersStatus: {
        [username]: 'online',
      },
    });

    await invitedUsers.map((user) =>
      inviteUserToAGroup(result.key, title, user, username, () => { })
    );

    const numberOfGroups = await get(ref(db, `users/${username}/groups`));
    await update(ref(db, `users/${username}`), {
      groups: numberOfGroups.val() + 1,
    });

    const groupsIdsUserParticipatesIn = await get(
      ref(db, `users/${username}/groupsIds`)
    );
    await update(ref(db, `users/${username}`), {
      groupsIds: {
        ...groupsIdsUserParticipatesIn.val(),
        [title]: result.key,
      },
    });
    
    return getGroupById(result.key);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Invites a user to a group.
 *
 * @param {string} groupId - The ID of the group.
 * @param {string} groupTitle - The title of the group.
 * @param {string} username - The username of the user to be invited.
 * @param {string} sender - The sender of the invitation.
 * @param {Function} callback - The callback function to be called after the invitation is sent.
 * @returns {Promise<void>} - A promise that resolves when the invitation is sent.
 */
export const inviteUserToAGroup = async (
  groupId,
  groupTitle,
  username,
  sender,
  callback
) => {
  const groupRef = ref(db, `groups/${groupId}`);
  const invitedUsersRef = child(groupRef, "invitedUsers");
  const userRef = child(ref(db, `users/${username}`), "groupInvitations");

  await update(invitedUsersRef, {
    [username]: "pending",
  });

  await update(userRef, {
    [groupTitle]: sender,
  });

  onValue(groupRef, (snapshot) => {
    callback({ ...snapshot.val(), id: groupId });
  });
};

/**
 * Removes a user's group invitation.
 *
 * @param {string} groupId - The ID of the group.
 * @param {string} groupTitle - The title of the group.
 * @param {string} username - The username of the user.
 * @param {Function} callback - The callback function to be called after removing the invitation.
 * @returns {Promise<void>} - A promise that resolves when the invitation is successfully removed.
 */
export const removeUserGroupInvitation = async (
  groupId,
  groupTitle,
  username,
  callback
) => {
  const groupRef = ref(db, `groups/${groupId}`);
  const invitedUsersRef = child(groupRef, "invitedUsers");
  const userRef = ref(db, `users/${username}`);
  const userGroupInvitationsRef = child(userRef, "groupInvitations");

  await update(invitedUsersRef, {
    [username]: null,
  });

  await update(userGroupInvitationsRef, {
    [groupTitle]: null,
  });

  onValue(groupRef, (snapshot) => {
    callback({ ...snapshot.val(), id: groupId });
  });
};
