import { useContext, useEffect, useState } from "react";
import { getAllPublicQuizzes } from "../../services/quizzes.service";
import Quizzes from "../../Components/Quizzes/Quizzes";
import AppContext from "../../Context/AppContext";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

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
  const [quizzes, setQuizzes] = useState(null);
  const [ongoingQuizzes, setOngoingQuizzes] = useState(null);
  const [finishedQuizzes, setFinishedQuizzes] = useState(null);
  const [page, setPage] = useState(1);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (userData) {
      getAllPublicQuizzes().then((result) => {
        if (userData.takenQuizzes) {
          const takenQuizzes = Object.keys(userData.takenQuizzes).map(
            (takenQuizId) => userData.takenQuizzes[takenQuizId].id
          );
          setQuizzes(result.filter((quiz) => !takenQuizzes.includes(quiz.id)));
        } else {
          setQuizzes(result);
        }
      });
    }
  }, [userData]);

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
          <h1
            style={{
              color: "rgb(3,165,251)",
              fontWeight: "bold",
              fontSize: "2em",
            }}
          >
            Challenge Yourself: Take a Quiz Today
          </h1>
        </div>
        {(ongoingQuizzes !== null || finishedQuizzes !== null) &&
        (ongoingQuizzes?.length > 0 || finishedQuizzes.length > 0) ? (
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
              ongoingQuizzes.length > 0 && <Quizzes quizzes={ongoingQuizzes} />
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
                <Quizzes quizzes={finishedQuizzes} />
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
