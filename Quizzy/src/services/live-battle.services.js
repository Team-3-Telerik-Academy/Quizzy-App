import { push, ref, update } from "firebase/database";
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
        await push(ref(db, "liveBattles"), {
            player1: sender,
            player1FullName: senderFullName,
            player2: receiver.username,
            player2FullName: receiver.firstName + ' ' + receiver.lastName,
            category1: '',
            category2: '',
            player1Ready: false,
            player2Ready: false,
            player1Score: 0,
            player2Score: 0,
            quizId: '',
        });
    } catch (error) {
        console.error(error);
    }
}