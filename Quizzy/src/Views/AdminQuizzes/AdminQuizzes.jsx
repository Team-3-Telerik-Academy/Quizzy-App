import { useContext, useEffect, useState } from "react";
import {
  getAllPrivateQuizzes,
  getAllPublicQuizzes,
} from "../../services/quizzes.service";
import Quizzes from "../../Components/Quizzes/Quizzes";
import { Box, Button, Typography } from "@mui/material";
import AppContext from "../../Context/AppContext";
import QuizCarousel from "../../Components/QuizCarousel/QuizCarousel";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import Loading from "../../Components/Loading/Loading";

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

/**
 * Renders the AdminQuizzes component.
 * 
 * @returns {JSX.Element} The rendered AdminQuizzes component.
 */
const AdminQuizzes = () => {
  const { type } = useParams();
  const [updateQuizzes, setUpdateQuizzes] = useState(false);
  const [view, setView] = useState(
    localStorage.getItem(
      type === "public" ? "adminPublicQuizzesView" : "adminPrivateQuizzesView"
    ) || "carousel"
  );
  const [page, setPage] = useState(
    parseInt(
      localStorage.getItem(
        type === "public" ? "adminPublicQuizzesPage" : "adminPrivateQuizzesPage"
      )
    ) || 1
  );
  const [ongoingQuizzes, setOngoingQuizzes] = useState();
  const [finishedQuizzes, setFinishedQuizzes] = useState();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (type === "public") {
      localStorage.setItem("adminPublicQuizzesPage", page);
    } else if (type === "private") {
      localStorage.setItem("adminPrivateQuizzesPage", page);
    }
  }, [page]);

  useEffect(() => {
    if (type === "public") {
      localStorage.setItem("adminPublicQuizzesView", view);
    } else if (type === "private") {
      localStorage.setItem("adminPrivateQuizzesView", view);
    }
  }, [view]);

  useEffect(() => {
    if (type === "public") {
      getAllPublicQuizzes().then((result) => {
        setOngoingQuizzes(result.filter((quiz) => quiz.status === "Ongoing"));
        setFinishedQuizzes(result.filter((quiz) => quiz.status === "Finished"));
      });
    } else if (type === "private") {
      getAllPrivateQuizzes().then((result) => {
        setOngoingQuizzes(result.filter((quiz) => quiz.status === "Ongoing"));
        setFinishedQuizzes(result.filter((quiz) => quiz.status === "Finished"));
      });
    }
  }, [updateQuizzes]);

  return (
    <>
      {ongoingQuizzes || finishedQuizzes ? (
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
              All{" "}
              <span style={{ color: "rgb(3,165,251)" }}>
                {type === "public" ? "Public" : "Private"} Quizzes
              </span>{" "}
              in our system,{" "}
              {
                <span style={{ color: "rgb(3,165,251)" }}>
                  {userData.firstName.charAt(0).toUpperCase() +
                    userData.firstName.slice(1).toLowerCase()}
                </span>
              }
            </span>
          </Typography>
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
                <StyledButton
                  style={{
                    backgroundColor: page === 1 && "rgba(255, 255, 255, 0.3)",
                  }}
                  onClick={() => setPage(1)}
                >
                  Ongoing Quizzes
                </StyledButton>
                <StyledButton
                  style={{
                    backgroundColor: page === 2 && "rgba(255, 255, 255, 0.3)",
                  }}
                  onClick={() => setPage(2)}
                >
                  Finished Quizzes
                </StyledButton>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  minHeight: "70.9vh",
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
                      marginRight: "1.7vw",
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
                      fontSize: "27px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexGrow: "1",
                    }}
                  >
                    There is no any ongoing quizzes!
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
                    fontSize: "27px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: "1",
                  }}
                  >
                    There is no any finished quizzes!
                  </h2>
                ) : (
                  page === 2 &&
                  finishedQuizzes.length > 0 && (
                    <>
                      {view === "carousel" ? (
                        <QuizCarousel
                          quizzes={finishedQuizzes}
                          value="author"
                        />
                      ) : (
                        <Quizzes quizzes={finishedQuizzes} value="author" />
                      )}
                    </>
                  )
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h2
                style={{
                  fontSize: "27px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: "1",
                }}
              >
                There is no any quizzes yet!
              </h2>
            </div>
          )}
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AdminQuizzes;
