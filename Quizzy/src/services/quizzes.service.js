import {
    ref,
    push,
    get,
    onValue,
    query,
    equalTo,
    orderByChild,
    update,
    set,
    remove,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const getQuizById = async (id) => {
    try {
        const result = await get(ref(db, `quizzes/${id}`));

        if (!result.exists()) {
            throw new Error(`Quiz with id ${id} does not exist!`);
        }

        const quiz = result.val();
        quiz.id = id;
        quiz.createdOn = new Date(quiz.createdOn);

        return quiz;
    } catch (error) {
        console.error(error);
    }
};

export const getQuizByTitle = async (title) => {
    try {
        const result = await get(query(ref(db, `quizzes`), orderByChild('title'), equalTo(title)));
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const addQuiz = async (title, questions, image, difficulty, timer, totalPoints, type, category, invitedUsers, username) => {

    const questionsObject = questions.reduce((obj, question) => {
        obj[question.title] = question;
        return obj;
    }, {});

    const invitedUsersObject = invitedUsers.reduce((obj, user) => {
        obj[user] = true;
        return obj;
    }, {});

    try {
        const result = await push(ref(db, "quizzes"), {
            title,
            questions: questionsObject,
            image,
            difficulty,
            timer,
            totalPoints,
            type,
            category,
            invitedUsers: invitedUsersObject,
            author: username,
            createdOn: new Date().toString(),
            takenBy: {},
        });

        return getQuizById(result.key);
    } catch (error) {
        console.error(error);
    }
};

export const updateQuizInfo = async (id, prop, value) => {
    const quizRef = ref(db, `quizzes/${id}`);
    await update(quizRef, { [prop]: value });

    onValue(quizRef, (snapshot) => {
        const updatedQuiz = snapshot.val();
        console.log(updatedQuiz);
    });
};