import { get, onValue, push, ref, remove, update } from "firebase/database";
import { db } from "../config/firebase-config";

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
            // player1Score: 0,
            // player2Score: 0,
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

export const addQuizToLiveBattle = async (liveBattleId, title, questions) => {
    await update(ref(db, `liveBattles/${liveBattleId}/quiz`), {
        title,
        questions,
    });
}

export const updateLiveBattle = async (liveBattleId, prop, value) => {

    await update(ref(db, `liveBattles/${liveBattleId}`), { [prop]: value });
}

export const deleteLiveBattle = async (liveBattleId, sender) => {
    await remove(ref(db, `users/${sender}/liveBattleWaitingInvitations/`));

    await remove(ref(db, `liveBattles/${liveBattleId}`));
}

export const listenToLiveBattle = (liveBattleId, callback) => {
    const liveBattleRef = ref(db, `liveBattles/${liveBattleId}`);
    onValue(liveBattleRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}