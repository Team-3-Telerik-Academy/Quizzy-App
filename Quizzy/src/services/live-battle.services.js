import { get, onValue, push, ref, remove, update } from "firebase/database";
import { db } from "../config/firebase-config";

/**
 * Sends a live battle invitation from the sender to the receiver.
 * 
 * @param {Object} receiver - The receiver of the invitation.
 * @param {Object} sender - The sender of the invitation.
 * @returns {Promise<void>} - A promise that resolves when the invitation is sent.
 */
export const inviteToLiveBattle = async (
    receiver,
    sender,
) => {
    await update(
        ref(db, `users/${receiver.username}/liveBattleInvitations/`),
        {
            [sender.username]: sender.firstName + ' ' + sender.lastName,
        }
    );
    await update(
        ref(db, `users/${sender.username}/liveBattleWaitingInvitations/`),
        {
            [receiver.username]: receiver.firstName + ' ' + receiver.lastName,
        }
    );
}

/**
 * Accepts a live battle invitation and updates the database accordingly.
 * @param {string} receiver - The username of the receiver of the invitation.
 * @param {string} sender - The username of the sender of the invitation.
 * @returns {Promise<string>} - A promise that resolves to the key of the newly created live battle.
 */
export const acceptLiveBattleInvitation = async (
    receiver,
    sender,
) => {
    try {
        const senderData = (await (get(ref(db, `users/${sender}`)))).val();

        const result = await push(ref(db, "liveBattles"), {
            player1: sender,
            player1FullName: senderData.firstName + ' ' + senderData.lastName,
            player1Image: senderData.image,
            player2: receiver.username,
            player2FullName: receiver.firstName + ' ' + receiver.lastName,
            player2Image: receiver.image,
        });

        await update(
            ref(db, `users/${sender}/liveBattleWaitingInvitations/`),
            {
                [result.key]: 'accepted',
            }
        );

        return result.key;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Retrieves a live battle by its ID.
 * @param {string} id - The ID of the live battle.
 * @returns {Promise<Object>} A promise that resolves to the live battle object.
 * @throws {Error} If the live battle with the specified ID does not exist.
 */
export const getLiveBattleById = async (id) => {
    try {
        const result = await get(ref(db, `liveBattles/${id}`));

        if (!result.exists()) {
            throw new Error(`LiveBattle with id ${id} does not exist!`);
        }

        const liveBattle = result.val();
        liveBattle.id = id;
        liveBattle.createdOn = new Date(liveBattle.createdOn);

        return liveBattle;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Adds a quiz to a live battle.
 * @param {string} liveBattleId - The ID of the live battle.
 * @param {string} title - The title of the quiz.
 * @param {Array} questions - An array of questions for the quiz.
 * @returns {Promise<void>} - A promise that resolves when the quiz is added to the live battle.
 */
export const addQuizToLiveBattle = async (liveBattleId, title, questions) => {
    await update(ref(db, `liveBattles/${liveBattleId}/quiz`), {
        title,
        questions,
    });
}

/**
 * Updates a live battle in the database.
 * @param {string} liveBattleId - The ID of the live battle to update.
 * @param {string} prop - The property to update.
 * @param {any} value - The new value for the property.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export const updateLiveBattle = async (liveBattleId, prop, value) => {
    await update(ref(db, `liveBattles/${liveBattleId}`), { [prop]: value });
}

/**
 * Deletes a live battle.
 * 
 * @param {string} liveBattleId - The ID of the live battle to delete.
 * @param {string} sender - The sender of the live battle invitation.
 * @returns {Promise<void>} - A promise that resolves when the live battle is deleted.
 */
export const deleteLiveBattle = async (liveBattleId, sender) => {
    await remove(ref(db, `users/${sender}/liveBattleWaitingInvitations/`));
    await remove(ref(db, `liveBattles/${liveBattleId}`));
}

/**
 * Listens to changes in a live battle.
 * @param {string} liveBattleId - The ID of the live battle to listen to.
 * @param {function} callback - The callback function to be called when the live battle data changes.
 */
export const listenToLiveBattle = (liveBattleId, callback) => {
    const liveBattleRef = ref(db, `liveBattles/${liveBattleId}`);
    onValue(liveBattleRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}