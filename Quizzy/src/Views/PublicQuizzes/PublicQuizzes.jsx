import unlocked from "..//..//Images/unlocked.svg";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { quizzesData } from "../../utils/publicQuizzesData";

const PublicQuizzes = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        style={{
          marginTop: "20px",
          fontFamily: "Georgia, serif",
          textAlign: "center",
        }}
      >
        🎯 <span style={{ color: "rgb(3,165,251)" }}>Public Quizzes</span>: Test
        Your Knowledge! 🎯
      </Typography>
      <Typography
        component="h1"
        variant="h5"
        style={{
          marginTop: "10px",
          textAlign: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        HTML & CSS Challenge 🎨 JavaScript Brain Teasers 🧠 React Riddles ⚛️
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#F3F4f6",
        }}
      >
        {quizzesData.map((quiz) => {
          return (
            <div
              key={quiz.id}
              style={{
                height: "50%",
                width: "300px",
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
                alt=""
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
                {quiz.name} Quiz
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
                {quiz.createdOn}
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
                    marginLeft: "30px",
                  }}
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicQuizzes;
