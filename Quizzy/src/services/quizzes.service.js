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

/**
 * Converts a Firebase snapshot of quizzes into an array of quiz objects.
 * @param {Object} snapshot - The Firebase snapshot containing quizzes.
 * @returns {Array} - An array of quiz objects.
 */
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

/**
 * Retrieves a quiz by its ID from the database.
 * @param {string} id - The ID of the quiz to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved quiz object.
 * @throws {Error} - If the quiz with the specified ID does not exist.
 */
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

/**
 * Retrieves a quiz by its title.
 *
 * @param {string} title - The title of the quiz to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the result of the retrieval.
 * @throws {Error} - If an error occurs during the retrieval process.
 */
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

/**
 * Retrieves all public quizzes from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of public quizzes.
 */
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

/**
 * Retrieves all private quizzes from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of private quizzes.
 */
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

/**
 * Retrieves quizzes by group ID.
 *
 * @param {string} groupId - The ID of the group.
 * @returns {Promise<Array>} - A promise that resolves to an array of quizzes.
 */
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

/**
 * Retrieves quizzes by author from the database.
 * @param {string} username - The username of the author.
 * @returns {Promise<Array>} - A promise that resolves to an array of quizzes.
 */
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

/**
 * Retrieves the taken quizzes by a user.
 *
 * @param {string} username - The username of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of taken quizzes.
 */
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

/**
 * Adds a new quiz to the database.
 * @param {string} title - The title of the quiz.
 * @param {Array} questions - An array of questions for the quiz.
 * @param {string} image - The URL of the image for the quiz.
 * @param {string} difficulty - The difficulty level of the quiz.
 * @param {number} timer - The duration of the quiz in seconds.
 * @param {number} totalPoints - The total points available in the quiz.
 * @param {string} type - The type of the quiz.
 * @param {string} category - The category of the quiz.
 * @param {Array} invitedUsers - An array of usernames of users invited to the quiz.
 * @param {string} username - The username of the author of the quiz.
 * @param {string} ongoingTill - The date until which the quiz is ongoing.
 * @param {string} group - The group associated with the quiz.
 * @returns {Promise} A promise that resolves to the newly created quiz.
 */
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

    questions.map((question) => addQuestionToAQuiz(result.key, question, () => { }));

    invitedUsers.map(user => inviteUserToAQuiz(result.key, title, user, username, () => { }));

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

/**
 * Deletes a quiz from the database and updates the user's created quizzes count.
 * @param {string} quizId - The ID of the quiz to be deleted.
 * @param {string} username - The username of the user who created the quiz.
 * @returns {Promise<void>} - A promise that resolves when the quiz is deleted and the user's created quizzes count is updated.
 */
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

/**
 * Updates the information of a quiz in the database.
 * 
 * @param {string} id - The ID of the quiz to update.
 * @param {string} prop - The property of the quiz to update.
 * @param {any} value - The new value for the specified property.
 * @param {Function} callback - The callback function to be called after the update is completed.
 * @returns {Promise<void>} - A promise that resolves when the update is completed.
 */
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

/**
 * Adds a question to a quiz.
 * @param {string} quizId - The ID of the quiz.
 * @param {object} question - The question object to be added.
 * @param {function} callback - The callback function to be called after the question is added.
 * @returns {Promise<void>} - A promise that resolves when the question is added successfully.
 */
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

/**
 * Removes a question from a quiz.
 * 
 * @param {string} quizId - The ID of the quiz.
 * @param {object} question - The question object to be removed.
 * @param {function} callback - The callback function to be called after the question is removed.
 * @returns {Promise<void>} - A promise that resolves when the question is successfully removed.
 */
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

/**
 * Invites a user to a quiz.
 * 
 * @param {string} quizId - The ID of the quiz.
 * @param {string} quizTitle - The title of the quiz.
 * @param {string} username - The username of the user to invite.
 * @param {string} sender - The username of the sender.
 * @param {Function} callback - The callback function to be called after the invitation is sent.
 * @returns {Promise<void>} - A promise that resolves when the invitation is sent.
 */
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

/**
 * Removes a user's quiz invitation.
 * 
 * @param {string} quizId - The ID of the quiz.
 * @param {string} quizTitle - The title of the quiz.
 * @param {string} username - The username of the user.
 * @param {Function} callback - The callback function to be called after removing the invitation.
 * @returns {Promise<void>} - A promise that resolves when the invitation is removed.
 */
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

/**
 * Adds a comment to a taken quiz.
 * 
 * @param {string} username - The username of the user who took the quiz.
 * @param {string} quizId - The ID of the quiz.
 * @param {string} comment - The content of the comment.
 * @param {string} author - The author of the comment.
 * @param {string} authorUsername - The username of the author.
 * @param {function} callback - The callback function to be called after the comment is added.
 * @returns {Promise<void>} - A promise that resolves when the comment is added successfully.
 */
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

/**
 * Removes a comment from a taken quiz.
 * @param {string} username - The username of the participant who took the quiz.
 * @param {string} quizId - The ID of the taken quiz.
 * @param {string} commentId - The ID of the comment to be removed.
 * @param {Function} callback - The callback function to be called after the comment is removed.
 * @returns {Promise<void>} - A promise that resolves when the comment is removed.
 */
export const removeCommentToATakenQuiz = async (username, quizId, commentId, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const commentsRef = child(takenQuizRef, `comments/${commentId}`);

  await remove(commentsRef);

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

/**
 * Edits a comment for a taken quiz.
 * 
 * @param {string} username - The username of the participant who took the quiz.
 * @param {string} quizId - The ID of the quiz.
 * @param {string} commentId - The ID of the comment to be edited.
 * @param {string} newComment - The new content of the comment.
 * @param {function} callback - The callback function to be called after the comment is edited.
 * @returns {Promise<void>} - A promise that resolves when the comment is successfully edited.
 */
export const editCommentToATakenQuiz = async (username, quizId, commentId, newComment, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const commentRef = child(takenQuizRef, `comments/${commentId}`);

  await update(commentRef, { 'content': newComment });

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

/**
 * Adds a reply to a comment in a taken quiz.
 * 
 * @param {string} username - The username of the user adding the reply.
 * @param {string} quizId - The ID of the quiz.
 * @param {string} commentId - The ID of the comment.
 * @param {string} reply - The content of the reply.
 * @param {string} author - The author of the reply.
 * @param {string} replyAuthor - The username of the reply author.
 * @param {string} commentAuthorUsername - The username of the comment author.
 * @param {function} callback - The callback function to be called after the reply is added.
 * @returns {Promise<void>} - A promise that resolves when the reply is added successfully.
 */
export const addReplyToACommentToATakenQuiz = async (username, quizId, commentId, reply, author, replyAuthor, commentAuthorUsername, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const repliesRef = child(takenQuizRef, `comments/${commentId}/replies`);

  if (replyAuthor === username) {
    const authorRef = child(ref(db, `users/${commentAuthorUsername}`), 'quizRepliesNotifications');

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

/**
 * Deletes a reply from a comment from a taken quiz.
 * @param {string} username - The username of the participant who took the quiz.
 * @param {string} quizId - The ID of the quiz.
 * @param {string} commentId - The ID of the comment.
 * @param {string} replyId - The ID of the reply.
 * @param {Function} callback - The callback function to be called after the reply is deleted.
 * @returns {Promise<void>} - A promise that resolves when the reply is deleted.
 */
export const deleteReplyFromACommentFromATakenQuiz = async (username, quizId, commentId, replyId, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const replyRef = child(takenQuizRef, `comments/${commentId}/replies/${replyId}`);

  await remove(replyRef);

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};

/**
 * Edits a reply in a comment in a taken quiz.
 * 
 * @param {string} username - The username of the participant who took the quiz.
 * @param {string} quizId - The ID of the quiz.
 * @param {string} commentId - The ID of the comment containing the reply.
 * @param {string} replyId - The ID of the reply to be edited.
 * @param {string} newReplyContent - The new content for the reply.
 * @param {function} callback - The callback function to be called after the reply is edited.
 * @returns {Promise<void>} - A promise that resolves when the reply is successfully edited.
 */
export const editReplyInACommentInATakenQuiz = async (username, quizId, commentId, replyId, newReplyContent, callback) => {
  const takenQuizRef = ref(db, `users/${username}/takenQuizzes/${quizId}`);
  const replyRef = child(takenQuizRef, `comments/${commentId}/replies/${replyId}`);

  await update(replyRef, { content: newReplyContent });

  onValue(takenQuizRef, (snapshot) => {
    callback({ ...snapshot.val(), id: quizId, participant: username });
  });
};