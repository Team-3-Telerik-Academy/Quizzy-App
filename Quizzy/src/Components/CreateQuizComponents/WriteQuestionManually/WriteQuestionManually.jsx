import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import AnswerForm from "../AnswerForm/AnswerForm";

const WriteQuestionManually = ({ addQuestion, cancelQuestion }) => {
  const [isAddAnswerButtonClicked, setIsAddAnswerButtonClicked] =
    useState(false);
  const [question, setQuestion] = useState({
    title: "",
    type: "",
    correctAnswer: "",
    answers: [],
    points: 1,
  });

  useEffect(() => {
    if (question.type === "boolean") {
      setQuestion({ ...question, answers: ["True", "False"] });
    } else if (question.type === "multiple") {
      setQuestion({ ...question, answers: [] });
    }
  }, [question.type]);

  const updateQuestion = (prop) => (e) => {
    setQuestion({
      ...question,
      [prop]: e.target.value,
    });
  };

  const addAnswer = (answer) => {
    if (!answer) {
      toast.error("The answer cannot be empty!");
      return;
    }

    if (question.answers.includes(answer)) {
      toast.error("The answer already exists!");
      return;
    }

    if (question.points < 1) {
      toast.error("The points cannot be less than 1!");
      return;
    }

    setQuestion({ ...question, answers: [...question.answers, answer] });
    setIsAddAnswerButtonClicked(false);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Question Title"
        value={question.title}
        onChange={updateQuestion("title")}
      />
      <select value={question.type} onChange={updateQuestion("type")}>
        <option value="">Select...</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>
      {question.type && question.type === "boolean" ? (
        <>
          <input
            type="radio"
            name="booleanQuestion"
            value="True"
            id="true"
            onChange={updateQuestion("correctAnswer")}
          />
          <label htmlFor="true">True</label>
          <input
            type="radio"
            name="booleanQuestion"
            value="False"
            id="false"
            onChange={updateQuestion("correctAnswer")}
          />
          <label htmlFor="false">False</label>
        </>
      ) : (
        question.type === "multiple" && (
          <>
            {isAddAnswerButtonClicked ? (
              <AnswerForm
                addAnswer={addAnswer}
                hideForm={() => setIsAddAnswerButtonClicked(false)}
              />
            ) : (
              <button onClick={() => setIsAddAnswerButtonClicked(true)}>
                Add Answer
              </button>
            )}
            {question?.answers?.map((answer) => (
              <div key={answer}>
                <input
                  type="radio"
                  name="multipleQuestion"
                  value={answer}
                  id={answer}
                  onChange={updateQuestion("correctAnswer")}
                />
                <label htmlFor="public">{answer}</label>
              </div>
            ))}
          </>
        )
      )}
      <span>Points:</span>
      <input
        type="number"
        name="points"
        id="points"
        value={question.points}
        onChange={updateQuestion("points")}
      />
      <button onClick={() => addQuestion(question)}>Add Question</button>
      <button onClick={cancelQuestion}>Cancel</button>
    </>
  );
};

WriteQuestionManually.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  cancelQuestion: PropTypes.func.isRequired,
};

export default WriteQuestionManually;
