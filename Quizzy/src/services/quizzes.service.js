import {
  ref,
  push,
  get,
  onValue,
  query,
  equalTo,
  orderByChild,
  update,
  remove,
  child,
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
    const result = await get(
      query(ref(db, `quizzes`), orderByChild("title"), equalTo(title))
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPublicQuizzes = async () => {
  try {
    const result = await get(
      query(ref(db, `quizzes`), orderByChild("type"), equalTo("public"))
    );
    if (!result.exists()) return [];
    return fromQuizzesDocument(result);
  } catch (error) {
    console.error(error);
  }
};

export const getAllPrivateQuizzes = async () => {
  try {
    const result = await get(
      query(ref(db, `quizzes`), orderByChild("type"), equalTo("private"))
    );
    if (!result.exists()) return [];
    return fromQuizzesDocument(result);
  } catch (error) {
    console.error(error);
  }
};

export const getQuizzesByGroupId = async (groupId) => {
  try {
    const result = await get(
      query(ref(db, "quizzes"), orderByChild("group"), equalTo(groupId))
    );
    if (!result.exists()) return [];
    return fromQuizzesDocument(result);
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

export const getTakenQuizzesByUser = async (username) => {
  try {
    const result = await get(ref(db, `users/${username}/takenQuizzes`));
    if (result.val()) {
      return fromQuizzesDocument(result);
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const addQuiz = async (
  title,
  questions,
  image,
  difficulty,
  timer,
  totalPoints,
  type,
  category,
  invitedUsers,
  username,
  ongoingTill,
  group
) => {
  let realCategory;

  if (category === "9") realCategory = "General Knowledge";
  if (category === "18") realCategory = "Computers";
  if (category === "22") realCategory = "Geography";
  if (category === "23") realCategory = "History";
  if (category === "19") realCategory = "Math";
  if (category === "17") realCategory = "Science & Nature";

  try {
    const result = await push(ref(db, "quizzes"), {
      title,
      image:
        image ||
        "https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/quiz-main-pic.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d",
      difficulty,
      timer,
      totalPoints,
      type,
      category: realCategory,
      author: username,
      ongoingTill: new Date(new Date(ongoingTill).setHours(0, 0, 0, 0)).toString(),
      group,
      createdOn: new Date().toString(),
      takenBy: {},
      status: "Ongoing",
    });

    await questions.map((question) => addQuestionToAQuiz(result.key, question, () => { }));

    await invitedUsers.map(user => inviteUserToAQuiz(result.key, title, user, username, () => { }));

    const createdQuizzes = await get(
      ref(db, `users/${username}/createdQuizzes`)
    );
    await update(ref(db, `users/${username}`), {
      createdQuizzes: createdQuizzes.val() + 1,
    });
    return getQuizById(result.key);
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuiz = async (quizId, username) => {
  try {
    await remove(ref(db, `quizzes/${quizId}`));

    const createdQuizzes = await get(
      ref(db, `users/${username}/createdQuizzes`)
    );
    await update(ref(db, `users/${username}`), {
      createdQuizzes: createdQuizzes.val() - 1,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateQuizInfo = async (id, prop, value, callback) => {
  const quizRef = ref(db, `quizzes/${id}`);

  if (prop === "type" && value === "public") {
    const snapshot = await get(quizRef);
    const invitedUsers = snapshot.val().invitedUsers;
    const quizTitle = snapshot.val().title;

    if (invitedUsers) {
      for (const username of Object.keys(invitedUsers)) {
        const userQuizInvitationsRef = ref(db, `users/${username}/quizInvitations`);
        await update(userQuizInvitationsRef, { [quizTitle]: null });
      }
    }

    await update(quizRef, { [prop]: value, invitedUsers: null });
  } else {
    await update(quizRef, { [prop]: value });
  }

  onValue(quizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: id });
  });
};

export const addQuestionToAQuiz = async (quizId, question, callback) => {
  const quizRef = ref(db, `quizzes/${quizId}`);
  const totalPoints = await get(child(quizRef, "totalPoints"));
  await update(quizRef, {
    totalPoints: Number(totalPoints.val()) + Number(question.points),
  });
  push(ref(db, `quizzes/${quizId}/questions`), question).then(() => {
    onValue(quizRef, (snapshot) => {
      callback({ ...snapshot.val(), id: quizId });
    });
  });
};

export const removeQuestionFromAQuiz = async (quizId, question, callback) => {
  const quizRef = ref(db, `quizzes/${quizId}`);
  const totalPoints = await get(child(quizRef, "totalPoints"));
  await update(quizRef, {
    totalPoints: Number(totalPoints.val()) - Number(question.points),
  });
  remove(ref(db, `quizzes/${quizId}/questions/${question.id}`)).then(() => {
    onValue(quizRef, (snapshot) => {
      callback({ ...snapshot.val(), id: quizId });
    });
  });
};

export const inviteUserToAQuiz = async (quizId, quizTitle, username, sender, callback) => {
  const quizRef = ref(db, `quizzes/${quizId}`);
  const invitedUsersRef = child(quizRef, "invitedUsers");
  const userRef = child(ref(db, `users/${username}`), 'quizInvitations');

  await update(invitedUsersRef, {
    [username]: 'pending',
  });

  await update(userRef, {
    [quizTitle]: sender,
  });

  onValue(quizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId });
  });
};

export const removeUserQuizInvitation = async (quizId, quizTitle, username, callback) => {
  const quizRef = ref(db, `quizzes/${quizId}`);
  const invitedUsersRef = child(quizRef, "invitedUsers");
  const userRef = ref(db, `users/${username}`);
  const userQuizInvitationsRef = child(userRef, 'quizInvitations');

  await update(invitedUsersRef, {
    [username]: null,
  });

  await update(userQuizInvitationsRef, {
    [quizTitle]: null,
  });

  onValue(quizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId });
  });
};

export const addCommentToATakenQuiz = async (username, quizId, comment, author, authorUsername, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const commentsRef = child(takenQuizRef, 'comments');
  const participantRef = child(ref(db, `users/${username}`), 'quizCommentsNotifications');

  const newCommentRef = await push(child(participantRef, 'comments'));
  const newCommentKey = newCommentRef.key;

  await push(commentsRef, { 'content': comment, 'author': author, 'authorUsername': authorUsername });
  await update(participantRef, {
    [newCommentKey]: quizId,
  });

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

export const removeCommentToATakenQuiz = async (username, quizId, commentId, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const commentsRef = child(takenQuizRef, `comments/${commentId}`);

  await remove(commentsRef);

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

export const editCommentToATakenQuiz = async (username, quizId, commentId, newComment, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const commentRef = child(takenQuizRef, `comments/${commentId}`);

  await update(commentRef, { 'content': newComment });

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

export const addReplyToACommentToATakenQuiz = async (username, quizId, commentId, reply, author, replyAuthor, commentAuthorUsername, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const repliesRef = child(takenQuizRef, `comments/${commentId}/replies`);

  //not finished - only one notification will appear like this
  if (replyAuthor === username) {
    const authorRef = child(ref(db, `users/${commentAuthorUsername}`), 'quizRepliesNotifications');
    // const newReplyRef = await push(child(authorRef, 'replies'));
    // const newReplyKey = newReplyRef.key;

    await push(authorRef, {
      quizId: quizId,
      username: username,
    });
  }

  if (replyAuthor === commentAuthorUsername) {
    const participantRef = child(ref(db, `users/${username}`), 'quizRepliesNotifications');
    const newReplyRef = await push(child(participantRef, 'replies'));
    const newReplyKey = newReplyRef.key;

    await update(participantRef, {
      [newReplyKey]: quizId,
    });
  }

  await push(repliesRef, { content: reply, author: author });

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

export const deleteReplyFromACommentFromATakenQuiz = async (username, quizId, commentId, replyId, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const replyRef = child(takenQuizRef, `comments/${commentId}/replies/${replyId}`);

  await remove(replyRef);

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

export const editReplyInACommentInATakenQuiz = async (username, quizId, commentId, replyId, newReplyContent, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const replyRef = child(takenQuizRef, `comments/${commentId}/replies/${replyId}`);

  await update(replyRef, { content: newReplyContent });

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};