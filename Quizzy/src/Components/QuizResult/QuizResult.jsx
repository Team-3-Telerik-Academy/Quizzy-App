import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import time from "..//../Images/time.svg";
import correct from "..//../Images/correct.svg";
import incorrect from "..//../Images/incorrect.svg";
import analytics from "..//../Images/analytics.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Represents the QuizResult component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.answers - The answers object.
 * @param {number} props.length - The length of the quiz.
 * @param {number} props.score - The score obtained in the quiz.
 * @param {Object} props.correctAns - The correct answers object.
 * @param {number} props.timeTaken - The time taken to complete the quiz.
 * @param {number} props.quizTotalPoints - The total points of the quiz.
 * @param {string} props.height - The height of the component.
 * @param {string} props.color - The background color of the component.
 * @param {string} props.margin - The margin of the component.
 * @returns {JSX.Element} The QuizResult component.
 */
const QuizResult = (props) => {
  const location = useLocation();
  const {
    answers: locationAnswers,
    length: locationLength,
    score: locationScore,
    correctAns: locationCorrectAns,
    timeTaken: locationTimeTaken,
    quizTotalPoints: locationQuizTotalPoints,
  } = location.state || {};

  const answers = props.answers || locationAnswers;
  const length = props.length || locationLength;
  const score = props.score || locationScore;
  const correctAns = props.correctAns || locationCorrectAns;
  const timeTaken = props.timeTaken || locationTimeTaken;
  const quizTotalPoints = props.quizTotalPoints || locationQuizTotalPoints;

  const [correctAnswers] = useState(correctAns && Object.values(correctAns).length);
  const [IncorrectAnswers] = useState(correctAns &&
    (length - Object.values(correctAns).length)
  );

  const handleView = () => {
    navigate("/resultDetails", { state: { answers: answers } });
  };

  const navigate = useNavigate();

  return (
    <>
    {(Object.keys(props).length === 0 && !location.state) ? navigate("*") : (<Box
        sx={{
          width: "100%",
          height: props.height ? props.height : "100vh",
          display: "flex",
          backgroundColor: props.color ? props.color : "#F3F4f6",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Container
          sx={{
            marginTop: props.margin ? props.margin : "100px",
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
                Score: <br />
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
                onClick={handleView}
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
      </Box>)}
      
    </>
  );
};

QuizResult.propTypes = {
  answers: PropTypes.array,
  length: PropTypes.number,
  score: PropTypes.number,
  correctAns: PropTypes.array,
  timeTaken: PropTypes.string,
  quizTotalPoints: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
};

export default QuizResult;
