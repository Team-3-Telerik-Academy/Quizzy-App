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
    });

    await invitedUsers.map((user) =>
      inviteUserToAGroup(result.key, title, user, username, () => {})
    );

    const numberOfGroups = await get(ref(db, `users/${username}/groups`));
    await update(ref(db, `users/${username}`), {
      groups: numberOfGroups.val() + 1,
    });
    return getGroupById(result.key);
  } catch (error) {
    console.error(error);
  }
};

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
