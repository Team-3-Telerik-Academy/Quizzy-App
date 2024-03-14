import { child, equalTo, get, onValue, orderByChild, push, query, ref, update } from "firebase/database";
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
) => {

    try {
        const result = await push(ref(db, "groups"), {
            title,
            image:
                image ||
                "https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/quiz-main-pic.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d",
            description,
            createdBy: username,
            createdOn: new Date().toString(),
        });

        await invitedUsers.map(user => inviteUserToAGroup(result.key, title, user, username, () => { }));

        const createdGroups = await get(
            ref(db, `users/${username}/createdGroups`)
        );
        await update(ref(db, `users/${username}`), {
            createdGroups: createdGroups.val() + 1,
        });
        return getGroupById(result.key);
    } catch (error) {
        console.error(error);
    }
};

export const inviteUserToAGroup = async (groupId, groupTitle, username, sender, callback) => {
    const quizRef = ref(db, `groups/${groupId}`);
    const invitedUsersRef = child(quizRef, "invitedUsers");
    const userRef = child(ref(db, `users/${username}`), 'groupInvitations');

    await update(invitedUsersRef, {
        [username]: 'pending',
    });

    await update(userRef, {
        [groupTitle]: sender,
    });

    onValue(quizRef, (snapshot) => {
        callback({ ...snapshot.val(), id: groupId });
    });
};

export const removeUserQuizInvitation = async (groupId, groupTitle, username, callback) => {
    const quizRef = ref(db, `groups/${groupId}`);
    const invitedUsersRef = child(quizRef, "invitedUsers");
    const userRef = ref(db, `users/${username}`);
    const userQuizInvitationsRef = child(userRef, 'groupInvitations');

    await update(invitedUsersRef, {
        [username]: null,
    });

    await update(userQuizInvitationsRef, {
        [groupTitle]: null,
    });

    onValue(quizRef, (snapshot) => {
        callback({ ...snapshot.val(), id: groupId });
    });
};