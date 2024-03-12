import { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { getQuizzesByAuthor } from "../../services/quizzes.service";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Quizzes from "../../Components/Quizzes/Quizzes";
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  color: '#fff',
  padding: '10px',
  borderRadius: '0px',
  '&:active': {
    backgroundColor: 'black',
  },
  '&:focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

const MyQuizzes = () => {
  const [ongoingQuizzes, setOngoingQuizzes] = useState(null);
  const [finishedQuizzes, setFinishedQuizzes] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

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
  }, [userData]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            backgroundColor: "#F3F4F6",
            height: "90.8vh",
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
            <h1
              style={{
                color: "rgb(3,165,251)",
                fontWeight: "bold",
                fontSize: "2em",
              }}
            >
              My Amazing Quizzes
            </h1>
          </div>
          {ongoingQuizzes?.length > 0 || finishedQuizzes.length > 0 ? (
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
                  onClick={() => setPage(1)}
                >
                  Ongoing Quizzes
                </StyledButton>
                <StyledButton
                  onClick={() => setPage(2)}
                >
                  Finished Quizzes
                </StyledButton>
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
                  <Quizzes quizzes={ongoingQuizzes} value="author" />
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
                  <Quizzes quizzes={finishedQuizzes} value="author" />
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
