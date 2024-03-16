import { useContext, useEffect, useState } from "react";
import {
  getAllPrivateQuizzes,
  getAllPublicQuizzes,
} from "../../services/quizzes.service";
import Quizzes from "../../Components/Quizzes/Quizzes";
import { Box, Typography } from "@mui/material";
import AppContext from "../../Context/AppContext";
import QuizCarousel from "../../Components/QuizCarousel/QuizCarousel";
import { useParams } from "react-router-dom";

const AdminQuizzes = () => {
  const { type } = useParams();
  const [view, setView] = useState(
    localStorage.getItem(
      type === "public" ? "adminPublicQuizzesView" : "adminPrivateQuizzesView"
    ) || "carousel"
  );
  const [quizzes, setQuizzes] = useState();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (type === "public") {
      localStorage.setItem("adminPublicQuizzesView", view);
    } else if (type === "private") {
      localStorage.setItem("adminPrivateQuizzesView", view);
    }
  }, [view]);

  useEffect(() => {
    if (type === "public") {
      getAllPublicQuizzes().then(setQuizzes);
    } else if (type === "private") {
      getAllPrivateQuizzes().then(setQuizzes);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          fontFamily: "fantasy",
          color: "#394E6A",
        }}
      >
        <span>
          {" "}
          All <span style={{ color: "rgb(3,165,251)" }}>{type === 'public' ? 'Public' : 'Private' } Quizzes</span> in
          our system,{" "}
          {
            <span style={{ color: "rgb(3,165,251)" }}>
              {userData.firstName.charAt(0).toUpperCase() +
                userData.firstName.slice(1).toLowerCase()}
            </span>
          }
        </span>
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
            width: "90%",
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
              <QuizCarousel quizzes={quizzes} value={"author"} />
            ) : (
              <Quizzes quizzes={quizzes} value={"author"} />
            )}
          </>
        )}
      </div>
    </Box>
  );
};

export default AdminQuizzes;
