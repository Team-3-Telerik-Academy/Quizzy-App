import { get, onValue, push, ref, update } from "firebase/database";
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
    senderFullName,
) => {
    try {
        const result = await push(ref(db, "liveBattles"), {
            player1: sender,
            player1FullName: senderFullName,
            player2: receiver.username,
            player2FullName: receiver.firstName + ' ' + receiver.lastName,
            player1Ready: false,
            player2Ready: false,
            player1Score: 0,
            player2Score: 0,
        });

        await update(
            ref(db, `users/${sender}/liveBattleWaitingInvitations/`),
            {
                [result.key]: 'accepted',
            }
        );

        console.log(result.key);
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
    await update(ref(db, `liveBattles/${liveBattleId}/${prop}`), value);
}

export const deleteLiveBattle = async (liveBattleId, sender) => {
    await update(
        ref(db, `users/${sender}/liveBattleWaitingInvitations/`),
        null
    );

    await update(ref(db, `liveBattles/${liveBattleId}`), null);
}

export const listenToLiveBattle = (liveBattleId, callback) => {
    const liveBattleRef = ref(db, `liveBattles/${liveBattleId}`);
    onValue(liveBattleRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}