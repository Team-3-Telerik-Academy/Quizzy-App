import { Button } from "@mui/material";
import PropTypes from "prop-types";
import unlocked from "..//..//Images/unlocked.svg";
import { useNavigate } from "react-router-dom";

const Quizzes = ({ quizzes }) => {
  const navigate = useNavigate();

  return (
    <div style={{margin: '20px', display: 'flex'}}>
      {quizzes.map((quiz) => (
        <>
          <div
            key={quiz.id}
            style={{
              height: "400px",
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
              style={{ width: "100%", height: "200px" }}
            />
            <img
              src={unlocked}
              alt=""
              style={{ width: "25px", marginLeft: "15px", marginTop: "15px" }}
            />
            <span
              style={{
                width: "150px",
                marginLeft: "15px",
                marginTop: "13px",
                fontWeight: "bold",
              }}
            >
              {quiz.title} Quiz
            </span>
            <span
              style={{
                width: "150px",
                marginLeft: "15px",
                marginTop: "13px",
                marginBottom: "7px",
                fontWeight: "bold",
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
                      quiz.difficulty === "Easy"
                        ? "green"
                        : quiz.difficulty === "Medium"
                        ? "orange"
                        : "red",
                    borderRadius: "15px",
                    padding: "7px",
                  }}
                >
                  {quiz.difficulty}
                </span>
              </span>
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
                  marginLeft: "20px",
                }}
              >
                Start Quiz
              </Button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

Quizzes.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Quizzes;
