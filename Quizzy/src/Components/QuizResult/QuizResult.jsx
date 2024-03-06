import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import time from "..//../Images/time.svg";
import correct from "..//../Images/correct.svg";
import incorrect from "..//../Images/incorrect.svg";
import analytics from "..//../Images/analytics.svg";
import toast from "react-hot-toast";
import { useState } from "react";

const QuizResult = ({
  score,
  length,
  correctAns,
  timeTaken,
  answers,
  quizTotalPoints,
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(
    Object.values(correctAns).length
  );
  const [IncorrectAnswers, setIncorrectAnswers] = useState(
    length - Object.values(correctAns).length
  );

  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          backgroundColor: "#F3F4f6",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Container
          sx={{
            marginTop: "50px",
            display: "flex",
            gap: "100px",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <Box
            sx={{
              boxShadow: 5,
              width: "300px",
              height: "300px",
              display: "flex",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "6px solid rgb(3,165,251)",
            }}
          >
            <span
              style={{
                fontFamily: "fantasy",
                color: "#394E6A",
                fontSize: "30px",
              }}
            >
              <span style={{ fontSize: "40px" }}>
                Your score: <br />
              </span>
              {((score / quizTotalPoints) * 100).toFixed(2)} %
            </span>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              height: "250px",
            }}
          >
            <Typography sx={{ display: "flex", gap: "10px" }}>
              <img
                src={correct}
                style={{ width: "30px", height: "30px" }}
                alt=""
              />
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "#394E6A",
                }}
              >
                {correctAnswers} correct answers.
              </span>
            </Typography>
            <Typography sx={{ display: "flex", gap: "10px" }}>
              <img
                src={incorrect}
                style={{ width: "30px", height: "30px" }}
                alt=""
              />
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "#394E6A",
                }}
              >
                {IncorrectAnswers} incorrect answers.
              </span>
            </Typography>

            <Typography sx={{ display: "flex", gap: "10px" }}>
              <img
                src={time}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "#394E6A",
                }}
              >
                {timeTaken}
              </span>
            </Typography>
            <Typography sx={{ display: "flex", gap: "10px" }}>
              <img
                src={analytics}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "#394E6A",
                }}
              >
                {score} out of {quizTotalPoints} points.
              </span>
            </Typography>
            <Box sx={{ display: "flex", marginTop: "15px" }}>
              <Button
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                variant="contained"
                onClick={() => navigate("/resultDetails")}
                style={{
                  backgroundColor: "rgb(3, 165, 251)",
                  textTransform: "none",
                  borderRadius: "20px",
                  width: "200px",
                  height: "40px",
                  fontWeight: "500",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
              >
                Review Your Answers
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default QuizResult;
