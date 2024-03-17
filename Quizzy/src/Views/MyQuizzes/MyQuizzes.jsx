import { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { getQuizzesByAuthor } from "../../services/quizzes.service";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { styled } from "@mui/system";
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

const MyQuizzes = () => {
  const [view, setView] = useState(localStorage.getItem('myQuizzesView') || "carousel");
  const [updateQuizzes, setUpdateQuizzes] = useState(false);
  const [ongoingQuizzes, setOngoingQuizzes] = useState(null);
  const [finishedQuizzes, setFinishedQuizzes] = useState(null);
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("myQuizzesPage")) || 1
  );
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("myQuizzesPage", page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem('myQuizzesView', view);
  }, [view]);

  useEffect(() => {
    if (userData) {
      getQuizzesByAuthor(userData.username)
        .then((quizzes) => {
          setOngoingQuizzes(
            quizzes.filter((quiz) => quiz.status === "Ongoing")
          );
          setFinishedQuizzes(
            quizzes.filter((quiz) => quiz.status === "Finished")
          );
        })
        .then(() => setLoading(false));
    }
  }, [userData, updateQuizzes]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            backgroundColor: "#F3F4F6",
            height: "91.7vh",
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
              My Amazing Quizzes
            </Typography>
          </div>
          {ongoingQuizzes?.length > 0 || finishedQuizzes?.length > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgb(3,165,251)",
                  gap: "50px",
                }}
              >
                <StyledButton style={{backgroundColor: page === 1 && 'rgba(255, 255, 255, 0.3)'}} onClick={() => setPage(1)}>
                  Ongoing Quizzes
                </StyledButton>
                <StyledButton style={{backgroundColor: page === 2 && 'rgba(255, 255, 255, 0.3)'}} onClick={() => setPage(2)}>
                  Finished Quizzes
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
                  You don&apos;t have any active quizzes!
                </h2>
              ) : (
                page === 1 &&
                ongoingQuizzes.length > 0 && (
                  <>
                    {view === "carousel" ? (
                      <QuizCarousel
                        quizzes={ongoingQuizzes}
                        value="author"
                        fn={setUpdateQuizzes}
                      />
                    ) : (
                      <Quizzes
                        quizzes={ongoingQuizzes}
                        value="author"
                        fn={setUpdateQuizzes}
                      />
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
                  You don&apos;t have any finished quizzes!
                </h2>
              ) : (
                page === 2 &&
                finishedQuizzes.length > 0 && (
                  <>
                    {view === "carousel" ? (
                      <QuizCarousel quizzes={finishedQuizzes} value="author" />
                    ) : (
                      <Quizzes quizzes={finishedQuizzes} value="author" />
                    )}
                  </>
                )
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h2
                style={{
                  color: "rgb(3,165,251)",
                  fontWeight: "bold",
                  fontSize: "1.5em",
                  marginTop: "10vh",
                }}
              >
                You haven&apos;t created any quizzes yet!
              </h2>
              <p style={{ fontSize: "1.2em" }}>
                Get started by clicking the
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    margin: "0 5px",
                    backgroundColor: "rgb(3, 165, 251)",
                  }}
                  onClick={() => navigate("/createQuiz")}
                >
                  Create Quiz
                </Button>
                button. <br /> Share your knowledge and challenge your friends
                or students with your own quizzes!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyQuizzes;
