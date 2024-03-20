import { useEffect, useState } from "react";
import { getAllPublicQuizzes } from "../../services/quizzes.service";
import QuizCarousel from "../../Components/QuizCarousel/QuizCarousel";
import { Typography } from "@mui/material";
import Quizzes from "../../Components/Quizzes/Quizzes";

/**
 * Renders the PublicQuizzes component.
 * This component displays a list of public quizzes and allows the user to switch between different views.
 *
 * @component
 * @returns {JSX.Element} The PublicQuizzes component
 */
const PublicQuizzes = () => {
  const [view, setView] = useState(
    localStorage.getItem("publicQuizzesView") || "carousel"
  );
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    localStorage.setItem("publicQuizzesView", view);
  }, [view]);

  useEffect(() => {
    getAllPublicQuizzes().then((result) =>
      setQuizzes(result.filter((quiz) => quiz.status === "Ongoing"))
    );
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          justifyContent: "center",
          height: "100%",
          backgroundColor: "#F3F4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            style={{
              backgroundColor: "white",
              color: "rgb(3,165,251)",
              marginRight: "15px",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid rgb(3,165,251)",
            }}
          >
            <option value="carousel">Slide Show</option>
            <option value="pages">Full View</option>
          </select>
        </div>
        {quizzes && (
          <>
            {view === "carousel" ? (
              <QuizCarousel quizzes={quizzes} />
            ) : (
              <Quizzes quizzes={quizzes} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PublicQuizzes;
