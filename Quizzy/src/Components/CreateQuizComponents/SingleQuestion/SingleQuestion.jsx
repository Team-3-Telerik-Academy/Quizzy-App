import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SingleQuestion = ({ question, removeQuestion }) => {
  return (
    <>
      <h4>{question.title}</h4>
      <span>Points: {question.points}</span>
      {question.answers.map((answer, index) => (
        <p key={index}>
          {String.fromCharCode(97 + index)}. {answer}
          {answer === question.correctAnswer && <CheckCircleOutlineIcon />}
        </p>
      ))}
      <button onClick={removeQuestion}>Remove Question</button>
    </>
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.object,
  removeQuestion: PropTypes.func,
};

export default SingleQuestion;
