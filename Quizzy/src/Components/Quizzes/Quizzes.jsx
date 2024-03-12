import { Button } from "@mui/material";
import PropTypes from "prop-types";
import unlocked from "..//..//Images/unlocked.svg";
import locked from "..//..//Images/locked.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateQuizInfo } from "../../services/quizzes.service";

const Quizzes = ({ quizzes, value }) => {
  const navigate = useNavigate();
  const [countdownTimes, setCountdownTimes] = useState(
    quizzes.map((quiz) => {
      if (quiz.status === "Ongoing") {
        return { [quiz.id]: new Date(quiz.ongoingTill) - new Date() };
      }
    }).filter(item => item !== undefined)
  );

  useEffect(() => {
    if (countdownTimes.length === 0) return;
    const timerId = setInterval(() => {
      setCountdownTimes(
        countdownTimes
          .map((timeObj) => {
            const quizId = Object.keys(timeObj)[0];
            const time = timeObj[quizId];
      
            if (time - 1000 > 0) {
              return { [quizId]: time - 1000 };
            } else {
              quizzes.find(quiz => quiz.id === quizId).status = "Finished";
              updateQuizInfo(quizId, "status", "Finished");
              return;
            }
          })
          .filter(item => item !== undefined)
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdownTimes]);

  return (
    <div
      style={{
        margin: "20px",
        marginBottom: '40px',
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        rowGap: "20px",
        gap: "25px",
      }}
    >
      {quizzes.map((quiz) => {
        const timeObj = countdownTimes.find((obj) => obj[quiz.id]);
        const time = timeObj ? timeObj[quiz.id] : 0;

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
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              display: "flex",
              flexDirection: "column",
              marginTop: "25px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={quiz.image}
              alt={quiz.title}
              style={{ width: "100%", height: "230px" }}
            />
            <img
              src={quiz.type === "public" ? unlocked : locked}
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "15px",
                marginTop: "15px",
              }}
            />
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
                  marginTop: "5px",
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
              ) : quiz.status === "Ongoing" && (
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
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Quizzes.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string,
};

export default Quizzes;
