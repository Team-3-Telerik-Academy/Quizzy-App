import { useContext, useEffect, useState } from "react";
import {
  getAllPrivateQuizzes,
  getAllPublicQuizzes,
} from "../../services/quizzes.service";
import AppContext from "../../Context/AppContext";
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import QuizCarousel from "../../Components/QuizCarousel/QuizCarousel";
import Quizzes from "../../Components/Quizzes/Quizzes";

const StyledButton = styled(Button)({
  color: "#fff",
  padding: "10px",
  borderRadius: "0px",
  "&:active": {
    backgroundColor: "black",
  },
  "&:focus": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

const QuizzesView = () => {
  const [view, setView] = useState(
    localStorage.getItem("quizzesView") || "carousel"
  );
  const [updateQuizzes, setUpdateQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState(null);
  const [ongoingQuizzes, setOngoingQuizzes] = useState(null);
  const [finishedQuizzes, setFinishedQuizzes] = useState(null);
  const [invitationalQuizzes, setInvitationalQuizzes] = useState(null);
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("quizzesPage")) || 1
  );
  const { userData } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("quizzesPage", page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem("quizzesView", view);
  }, [view]);

  useEffect(() => {
    if (userData) {
      getAllPublicQuizzes()
        .then((result) => {
          if (userData.takenQuizzes) {
            const takenQuizzes = Object.keys(userData.takenQuizzes).map(
              (takenQuizId) => userData.takenQuizzes[takenQuizId].id
            );
            setQuizzes(
              result.filter((quiz) => !takenQuizzes.includes(quiz.id))
            );
          } else {
            setQuizzes(result);
          }
        })
        .then(() =>
          getAllPrivateQuizzes().then((result) => {
            if (userData.takenQuizzes) {
              const takenQuizzes = Object.keys(userData.takenQuizzes).map(
                (takenQuizId) => userData.takenQuizzes[takenQuizId].id
              );
              const allInvitationalQuizzes = result.filter((quiz) =>
                Object.keys(quiz.invitedUsers).includes(userData.username)
              );
              const acceptedQuizzes = allInvitationalQuizzes.filter(
                (quiz) => quiz.invitedUsers[userData.username] === "accepted"
              );
              const acceptedOngoingQuizzes = acceptedQuizzes.filter(
                (quiz) => quiz.status === "Ongoing"
              );
              setInvitationalQuizzes(
                acceptedOngoingQuizzes.filter(
                  (quiz) => !takenQuizzes.includes(quiz.id)
                )
              );
            } else {
              const allInvitationalQuizzes = result.filter((quiz) =>
                Object.keys(quiz.invitedUsers).includes(userData.username)
              );
              const acceptedQuizzes = allInvitationalQuizzes.filter(
                (quiz) => quiz.invitedUsers[userData.username] === "accepted"
              );
              const acceptedOngoingQuizzes = acceptedQuizzes.filter(
                (quiz) => quiz.status === "Ongoing"
              );
              setInvitationalQuizzes(acceptedOngoingQuizzes);
            }
          })
        );
    }
  }, [userData, updateQuizzes]);

  useEffect(() => {
    if (quizzes) {
      setOngoingQuizzes(quizzes.filter((quiz) => quiz.status === "Ongoing"));
      setFinishedQuizzes(quizzes.filter((quiz) => quiz.status === "Finished"));
    }
  }, [quizzes]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#F3F4F6",
          height: "90.9vh",
          marginTop: "20px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#394E6A",
              fontFamily: "Fantasy",
              margin: "20px 0",
            }}
          >
            Challenge Yourself: Take a Quiz Today
          </Typography>
        </div>
        {ongoingQuizzes?.length > 0 ||
        finishedQuizzes?.length > 0 ||
        invitationalQuizzes?.length > 0 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "rgb(3,165,251)",
                gap: "50px",
              }}
            >
              <StyledButton onClick={() => setPage(1)}>
                Ongoing Quizzes
              </StyledButton>
              <StyledButton onClick={() => setPage(2)}>
                Finished Quizzes
              </StyledButton>
              <StyledButton onClick={() => setPage(3)}>
                Invitational Quizzes
              </StyledButton>
            </div>
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
                  marginRight: "3.5vw",
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
            {page === 1 && ongoingQuizzes.length === 0 ? (
              <h2
                style={{
                  alignItems: "center",
                  fontSize: "27px",
                  display: "flex",
                  justifyContent: "center",
                  height: "55%",
                }}
              >
                No ongoing quizzes available at the moment!
              </h2>
            ) : (
              page === 1 &&
              ongoingQuizzes.length > 0 && (
                <>
                  {view === "carousel" ? (
                    <QuizCarousel
                      quizzes={ongoingQuizzes}
                      fn={setUpdateQuizzes}
                    />
                  ) : (
                    <Quizzes quizzes={ongoingQuizzes} fn={setUpdateQuizzes} />
                  )}
                </>
              )
            )}
            {page === 2 && finishedQuizzes.length === 0 ? (
              <h2
                style={{
                  alignItems: "center",
                  fontSize: "27px",
                  display: "flex",
                  justifyContent: "center",
                  height: "55%",
                }}
              >
                No finished quizzes available at the moment!
              </h2>
            ) : (
              page === 2 &&
              finishedQuizzes.length > 0 && (
                <>
                  <>
                    {view === "carousel" ? (
                      <QuizCarousel quizzes={finishedQuizzes} />
                    ) : (
                      <Quizzes quizzes={finishedQuizzes} />
                    )}
                  </>
                </>
              )
            )}
            {page === 3 && invitationalQuizzes?.length === 0 ? (
              <h2
                style={{
                  alignItems: "center",
                  fontSize: "27px",
                  display: "flex",
                  justifyContent: "center",
                  height: "55%",
                }}
              >
                You haven&apos;t been invited to any quizzes yet!
              </h2>
            ) : (
              page === 3 &&
              invitationalQuizzes?.length > 0 && (
                <>
                {view === "carousel" ? (
                    <QuizCarousel
                      quizzes={invitationalQuizzes}
                      fn={setUpdateQuizzes}
                    />
                  ) : (
                    <Quizzes quizzes={invitationalQuizzes} fn={setUpdateQuizzes} />
                  )}
                </>
              )
            )}
          </>
        ) : (
          <h1
            style={{ textAlign: "center", marginTop: "35vh", height: "28vh" }}
          >
            No quizzes available at the moment
          </h1>
        )}
      </div>
    </>
  );
};

export default QuizzesView;
