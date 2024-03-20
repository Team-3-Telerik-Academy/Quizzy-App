import { Button } from "@mui/material";
import PropTypes from "prop-types";
import unlocked from "..//..//Images/unlocked.svg";
import locked from "..//..//Images/locked.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateQuizInfo } from "../../services/quizzes.service";

/**
 * Renders a single quiz component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.quiz - The quiz object.
 * @param {string} props.value - The value prop.
 * @param {Function} props.fn - The function prop.
 * @returns {JSX.Element} The rendered SingleQuiz component.
 */
const SingleQuiz = ({ quiz, value, fn }) => {
  const navigate = useNavigate();
  const [countdownTime, setCountdownTime] = useState(
    quiz.status === "Ongoing" ? new Date(quiz.ongoingTill) - new Date() : 0
  );

  useEffect(() => {
    if (countdownTime === 0) return;
    const timerId = setInterval(() => {
      const time = countdownTime;

      if (time - 1000 > 0) {
        setCountdownTime(time - 1000);
      } else {
        quiz.status = "Finished";
        updateQuizInfo(quiz.id, "status", "Finished").then(() => {
          fn(prev => !prev);
        });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdownTime]);

  const time = countdownTime;

  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(1, "0");
  const minutes = Math.floor((time / 1000 / 60) % 60)
    .toString()
    .padStart(1, "0");
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(1, "0");
  const days = Math.floor(time / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(1, "0");

  return (
    <div
      key={quiz.id}
      style={{
        height: "450px",
        width: "330px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={quiz.image}
        alt={quiz.title}
        style={{ width: "100%", height: "230px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "5px",
          height: '30px'
        }}
      >
        <img
          src={quiz.type === "public" ? unlocked : locked}
          style={{
            width: "20px",
            height: "20px",
            marginLeft: "10px",
            marginTop: "15px",
          }}
        />
        {quiz.status === "Finished" && quiz.type === 'private' && (
          <Button
            variant="contained"
            onClick={() => navigate(`/quizStatistics/${quiz.id}`)}
            style={{
              backgroundColor: "rgb(3, 165, 251)",
              textTransform: "none",
              borderRadius: "20px",
              width: "100px",
              height: "35px",
              fontWeight: "500",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Statistics
          </Button>
        )}
      </div>
      <span
        style={{
          width: "100%",
          overflowWrap: "break-word",
          marginLeft: "15px",
          marginTop: "13px",
          fontWeight: "bold",
          fontSize: "17px",
        }}
      >
        {quiz.title}
      </span>
      <span
        style={{
          width: "100%",
          overflowWrap: "break-word",
          marginLeft: "15px",
          marginTop: "5px",
        }}
      >
        Category: {quiz.category}
      </span>
      <span
        style={{
          width: "100%",
          marginLeft: "15px",
          marginTop: "5px",
          flexGrow: "1",
        }}
      >
        Status: {quiz.status}
      </span>
      {quiz.status === "Ongoing" && (
        <span
          style={{
            width: "100%",
            marginLeft: "15px",
            marginBottom: "7px",
            flexGrow: "1",
          }}
        >
          Closes in: {days}d {hours}h {minutes}m {seconds}s
        </span>
      )}
      <div
        style={{
          width: "100%",
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ marginLeft: "15px" }}>
          <strong>Difficulty:</strong>
          <span
            style={{
              fontSize: "22px",
              marginLeft: "5px",
              color:
                quiz.difficulty === "easy"
                  ? "green"
                  : quiz.difficulty === "medium"
                  ? "orange"
                  : "red",
              borderRadius: "15px",
              padding: "7px",
            }}
          >
            {quiz.difficulty}
          </span>
        </span>
        {value === "author" ? (
          <Button
            variant="contained"
            onClick={() => navigate(`/editQuiz/${quiz.id}`)}
            style={{
              backgroundColor: "rgb(3, 165, 251)",
              textTransform: "none",
              borderRadius: "20px",
              width: "100px",
              height: "35px",
              fontWeight: "500",
              marginRight: "10px",
            }}
          >
            Edit Quiz
          </Button>
        ) : (
          quiz.status === "Ongoing" && (
            <Button
              variant="contained"
              onClick={() => navigate(`/publicQuizzes/${quiz.id}`)}
              style={{
                backgroundColor: "rgb(3, 165, 251)",
                textTransform: "none",
                borderRadius: "20px",
                width: "100px",
                height: "35px",
                fontWeight: "500",
                marginRight: "10px",
              }}
            >
              Start Quiz
            </Button>
          )
        )}
      </div>
    </div>
  );
};

SingleQuiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  value: PropTypes.string,
  fn: PropTypes.func,
};

export default SingleQuiz;
