import { useEffect, useState } from "react";
import { getAllPublicQuizzes } from "../../services/quizzes.service";
import QuizCarousel from "../../Components/QuizCarousel/QuizCarousel";
import { Typography } from "@mui/material";

const PublicQuizzes = () => {
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    getAllPublicQuizzes().then(result => setQuizzes(result.filter((quiz) => quiz.status === "Ongoing")));
  }, []);

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
          height: "100%",
          backgroundColor: "#F3F4f6",
        }}
      >
        {quizzes && <QuizCarousel quizzes={quizzes} />}
      </div>
    </div>
  );
};

export default PublicQuizzes;
