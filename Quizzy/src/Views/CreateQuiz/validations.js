import toast from "react-hot-toast";

export const validateQuiz = (quiz) => {
    if (quiz.title.length < 3 || quiz.title.length > 30) {
        toast.error("The quiz title must be between 3 and 30 characters!");
        return true;
    }

    if (!quiz.type) {
        toast.error("You must select a quiz type!");
        return true;
    }

    if (!quiz.category) {
        toast.error("You must select a quiz category!");
        return true;
    }

    if (!quiz.difficulty) {
        toast.error("You must select a quiz difficulty!");
        return true;
    }

    if (quiz.questions.length < 1) {
        toast.error("You must add at least 1 question!");
        return true;
    }

    return false;
}

export const validateQuestion = (question) => {
    if (!question.title) {
        toast.error("The question title cannot be empty!");
        return true;
    }

    if (!question.type) {
        toast.error("You must select a question type!");
        return true;
    }

    if (question.answers.length < 2) {
        toast.error("You must add at least 2 answers!");
        return true;
    }

    if (!question.correctAnswer) {
        toast.error("You must select a correct answer!");
        return true;
    }

    if (question.points < 1) {
        toast.error("The question points must be at least 1!");
        return true;
    }

    return false;
}