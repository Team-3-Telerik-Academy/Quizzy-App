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

export const fromQuizzesDocument = (snapshot) => {
    try {
      const quizzesDocument = snapshot.val();
  
      if (!quizzesDocument) {
        throw new Error("Snapshot value is null or undefined");
      }
  
      return Object.keys(quizzesDocument).map((key) => {
        const quiz = quizzesDocument[key];
  
        if (!quiz) {
          throw new Error(`Quiz with key ${key} is null or undefined`);
        }
  
        return {
          ...quiz,
          id: key,
          createdOn: new Date(quiz.createdOn),
        };
      });
    } catch (error) {
      console.error(error);
    }
  };
  

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

export const getQuizzesByAuthor = async (username) => {
    try {
      const snapshot = await get(
        query(ref(db, "quizzes"), orderByChild("author"), equalTo(username))
      );
  
      if (!snapshot.exists()) return [];
  
      return fromQuizzesDocument(snapshot);
    } catch (error) {
      console.error(error);
    }
  };

export const addQuiz = async (title, questions, image, difficulty, timer, totalPoints, type, category, invitedUsers, username, activeTimeInMinutes) => {
    let realCategory;

    if (category === '9') realCategory = 'General Knowledge'
    if (category === '25') realCategory = 'Geography'
    if (category === '23') realCategory = 'History'
    if (category === '19') realCategory = 'Math'
    if (category === '17') realCategory = 'Science & Nature'
    if (category === '18') realCategory = 'Computers'
    // if (category === '22') realCategory = 'Art'

    // const questionsObject = questions.reduce((obj, question) => {
    //     obj[question.title] = question;
    //     return obj;
    // }, {});

    const invitedUsersObject = invitedUsers.reduce((obj, user) => {
        obj[user] = true;
        return obj;
    }, {});

    try {
        const result = await push(ref(db, "quizzes"), {
            title,
            questions,
            image: image || 'https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/quiz-main-pic.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d',
            difficulty,
            timer,
            totalPoints,
            type,
            category,
            invitedUsers: invitedUsersObject,
            author: username,
            activeTimeInMinutes,
            createdOn: new Date().toString(),
            takenBy: {},
            status: 'active',
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