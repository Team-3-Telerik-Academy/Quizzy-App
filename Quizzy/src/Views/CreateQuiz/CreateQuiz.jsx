import { useContext, useEffect, useRef, useState } from "react";
import { addQuiz, getQuizByTitle } from "../../services/quizzes.service";
import AppContext from "../../Context/AppContext";
import { getStorage, ref } from "firebase/storage";
import {
  deleteImage,
  moveFile,
  uploadImage,
} from "../../services/image.services";
import { getQuizQuestions } from "../../services/request-service";
import GeneratedSingleQuestion from "../../Components/CreateQuizComponents/GeneratedSingleQuestion/GeneratedSingleQuestion";
import SingleQuestion from "../../Components/CreateQuizComponents/SingleQuestion/SingleQuestion";
import WriteQuestionManually from "../../Components/CreateQuizComponents/WriteQuestionManually/WriteQuestionManually";
import { validateQuestion, validateQuiz } from "./validations";
import toast from "react-hot-toast";
import { getAllUsers } from "../../services/users.service";

const storage = getStorage();

const CreateQuiz = () => {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState(null);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [quiz, setQuiz] = useState({
    title: "",
    image: "",
    type: "",
    category: "",
    difficulty: "",
    timer: "0",
    totalPoints: 0,
    invitedUsers: [],
    questions: [],
    generated: false,
  });

  useEffect(() => {
    if (quiz.category && quiz.difficulty) {
      getQuizQuestions(quiz.category, quiz.difficulty).then(
        setGeneratedQuestions
      );
    }
  }, [quiz.category, quiz.difficulty]);

  useEffect(() => {
    if (quiz.type === "private") {
      getAllUsers().then(setUsers);
    }
  }, [quiz.type]);

  const addGeneratedQuestion = (question) => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, question],
      totalPoints: quiz.totalPoints + Number(question.points),
    });
    setGeneratedQuestions(
      generatedQuestions.filter((el) => el.title !== question.title)
    );
  };

  const addQuestion = (question) => {
    if (validateQuestion(question)) return;

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, question],
      totalPoints: quiz.totalPoints + Number(question.points),
    });
    setShowQuizForm(false);
  };

  const removeQuestion = (question) => {
    if (question.generated) {
      setGeneratedQuestions([...generatedQuestions, question]);
    }

    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((el) => el.title !== question.title),
      totalPoints: quiz.totalPoints - Number(question.points),
    });
  };

  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleDelete = () => {
    setQuiz({ ...quiz, image: "" });
    const imageRef = ref(storage, "createQuizImage/" + userData.username);
    deleteImage(imageRef);
  };

  const handleFileChange = (event) => {
    if (quiz.image) {
      const imageRef = ref(storage, "createQuizImage/" + userData.username);
      deleteImage(imageRef);
    }

    const file = event.target.files[0];
    const storageRef = ref(storage, "createQuizImage/" + userData.username);

    uploadImage(storageRef, file, setQuiz, quiz);
  };

  const updateQuiz = (prop) => (e) => {
    setQuiz({
      ...quiz,
      [prop]: e.target.value,
    });
  };

  const handleAddQuiz = () => {
    if (validateQuiz(quiz)) return;

    let promise;

    if (quiz.image) {
      const pastStorageRef = ref(storage, "quizzesImages/" + userData.username);
      const newStorageRef = ref(storage, "quizzesImages/" + quiz.title);

      promise = moveFile(pastStorageRef, newStorageRef, setQuiz, quiz);
    } else {
      promise = Promise.resolve();
    }

    promise
      .then(() => getQuizByTitle(quiz.title))
      .then((snapshot) => {
        if (snapshot.exists()) {
          toast.error(`Quiz with title '${quiz.title}' has already exists!`);
          throw new Error(
            `Quiz with title '${quiz.title}' has already exists!`
          );
        }
        return addQuiz(
          quiz.title,
          quiz.questions,
          quiz.image,
          quiz.difficulty,
          quiz.timer,
          quiz.totalPoints,
          quiz.type,
          quiz.category,
          quiz.invitedUsers,
          userData.username
        );
      })
      .then(() => {
        setQuiz({
          title: "",
          image: "",
          type: "",
          category: "",
          difficulty: "",
          timer: "0",
          totalPoints: 0,
          invitedUsers: [],
          questions: [],
          generated: false,
        });
        setGeneratedQuestions(null);
      });
  };

  return (
    <>
      <h1>Create new Quiz:</h1>
      <input
        value={quiz.title}
        onChange={updateQuiz("title")}
        type="text"
        name="quizTitle"
        id="quizTitle"
        placeholder="Quiz Title"
      />
      {quiz?.image ? (
        <div id="upload-image">
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleUploadClick}>Change Image</button>
          <button onClick={handleDelete}>Delete Image</button>
          <img src={quiz.image} alt={quiz.title} />
        </div>
      ) : (
        <div id="upload-image">
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleUploadClick}>Upload Image</button>
        </div>
      )}
      <div id="type">
        <span>Type:</span>
        <input
          type="radio"
          name="quizType"
          value="public"
          id="public"
          checked={quiz.type === "public"}
          onChange={updateQuiz("type")}
        />
        <label htmlFor="public">Public</label>
        <input
          type="radio"
          name="quizType"
          value="private"
          id="private"
          checked={quiz.type === "private"}
          onChange={updateQuiz("type")}
        />
        <label htmlFor="private">Private</label>
      </div>
      {quiz.type === "private" &&
        users?.map((user) => (
          <div key={user.username}>
            <input
              type="checkbox"
              value={user.username}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  invitedUsers: e.target.checked
                    ? [...quiz.invitedUsers, user.username]
                    : quiz.invitedUsers.filter((el) => el !== user.username),
                })
              }
            />
            <label>{user.username}</label>
          </div>
        ))}
      <div id="totalPoints">
        <span>Total Points: {quiz.totalPoints}</span>
      </div>
      <div id="timer">
        <span>Timer:</span>
        <select value={quiz.timer} onChange={updateQuiz("timer")}>
          <option value="0">No Timer</option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
          <option value="120">120 minutes</option>
        </select>
      </div>
      <div id="category">
        <span>Category:</span>
        <select value={quiz.category} onChange={updateQuiz("category")}>
          <option value="">Select...</option>
          <option value="9">General Knowledge</option>
          <option value="25">Art</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="19">Math</option>
          <option value="17">Science & Nature</option>
        </select>
      </div>
      <div id="difficulty">
        <span>Difficulty:</span>
        <input
          type="radio"
          name="difficulty"
          value="easy"
          id="easy"
          checked={quiz.difficulty === "easy"}
          onChange={updateQuiz("difficulty")}
        />
        <label htmlFor="easy">Easy</label>
        <input
          type="radio"
          name="difficulty"
          value="medium"
          id="medium"
          checked={quiz.difficulty === "medium"}
          onChange={updateQuiz("difficulty")}
        />
        <label htmlFor="medium">Medium</label>
        <input
          type="radio"
          name="difficulty"
          value="hard"
          id="hard"
          checked={quiz.difficulty === "hard"}
          onChange={updateQuiz("difficulty")}
        />
        <label htmlFor="hard">Hard</label>
      </div>
      <div id="quiz-questions">
        {showQuizForm ? (
          <>
            <WriteQuestionManually
              addQuestion={addQuestion}
              cancelQuestion={() => setShowQuizForm(false)}
            />
          </>
        ) : (
          <button onClick={() => setShowQuizForm(true)}>
            Write Question Manually
          </button>
        )}
      </div>
      {quiz?.questions?.length > 0 && (
        <>
          <h2>Questions:</h2>
          {[...quiz.questions].reverse().map((question) => (
            <SingleQuestion
              key={question.title}
              question={question}
              removeQuestion={() => removeQuestion(question)}
            />
          ))}
        </>
      )}
      {generatedQuestions && (
        <>
          <h2>Generated Questions:</h2>
          {generatedQuestions.map((question) => (
            <GeneratedSingleQuestion
              key={question.title}
              question={question}
              addQuestion={addGeneratedQuestion}
            />
          ))}
        </>
      )}
      <button onClick={handleAddQuiz}>Create Quiz</button>
    </>
  );
};

export default CreateQuiz;
