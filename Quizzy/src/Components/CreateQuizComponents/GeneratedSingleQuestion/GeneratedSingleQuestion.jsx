import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import toast from "react-hot-toast";

const GeneratedSingleQuestion = ({ question, addQuestion }) => {
  const [newQuestion, setNewQuestion] = useState(question);

  const handleClick = () => {
    if (newQuestion.points < 1) {
      toast.error("The points cannot be less than 1!");
      return;
    }
    
    addQuestion(newQuestion);
  };

  return (
    <>
      <h4>{question.title}</h4>
      {question.answers.map((answer, index) => (
        <p key={index}>
          {String.fromCharCode(97 + index)}. {answer}
          {answer === question.correctAnswer && <CheckCircleOutlineIcon />}
        </p>
      ))}
      <span>Points:</span>
      <input
        type="number"
        name="points"
        id="points"
        value={newQuestion.points}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, points: e.target.value })
        }
      />
      <button onClick={handleClick}>Add Question</button>
    </>
  );
};

GeneratedSingleQuestion.propTypes = {
  question: PropTypes.object,
  addQuestion: PropTypes.func,
};

export default GeneratedSingleQuestion;
