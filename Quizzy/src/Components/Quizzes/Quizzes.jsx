import { Button } from "@mui/material";
import PropTypes from "prop-types";
import unlocked from "..//..//Images/unlocked.svg";
import locked from "..//..//Images/locked.png";
import { useNavigate } from "react-router-dom";

const Quizzes = ({ quizzes, value }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        margin: "20px",
        marginLeft: "23px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "20px",
        gap: "25px",
      }}
    >
      {quizzes.map((quiz) => (
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
            style={{ width: "100%", height: "250px" }}
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
            {quiz.category} Category
          </span>
          <span
            style={{
              width: "100%",
              marginLeft: "15px",
              marginTop: "5px",
              marginBottom: "7px",
              flexGrow: "1",
            }}
          >
            {quiz.createdOn.toLocaleString("bg-BG", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <div
            style={{
              width: "100%",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
              Difficulty:
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor:
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
      ))}
    </div>
  );
};

Quizzes.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string,
};

export default Quizzes;
