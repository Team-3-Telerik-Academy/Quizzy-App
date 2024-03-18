import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { getTakenQuizzesByUser } from "../../services/quizzes.service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TakenQuizzes = () => {
  const [takenQuizzes, setTakenQuizzes] = useState(null);
  const [quizzesOnPage, setQuizzesOnPage] = useState(null);
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("takenQuizzesPage")) || 1
  );
  const [numberOfPages, setNumberOfPages] = useState(1);
  const number = 5;
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("takenQuizzesPage", page);
  }, [page]);

  useEffect(() => {
    getTakenQuizzesByUser(userData?.username).then(setTakenQuizzes);
  }, []);

  useEffect(() => {
    if (takenQuizzes) {
      setNumberOfPages(Math.ceil(takenQuizzes.length / number));
      setQuizzesOnPage(takenQuizzes.slice((page - 1) * number, page * number));
    }
  }, [takenQuizzes]);

  const handleViewDetails = (quiz) => {
    navigate("/takenQuizzes/details", { state: { quiz: quiz } });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setQuizzesOnPage(takenQuizzes.slice((value - 1) * number, value * number));
  };

  return (
    <>
      {takenQuizzes && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "20px",
            height: "91.6vh",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#394E6A",
              fontFamily: "Fantasy",
              marginTop: "20px",
            }}
          >
            Taken Quizzes
          </Typography>
          <span
            style={{
              marginBottom: "15px",
              color: "rgb(3, 165, 251)",
              fontSize: "16px",
            }}
          >
            <strong>Here are the quizzes you have taken:</strong>
          </span>
          <div
            style={{
              backgroundColor: "#F3F4F6",
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {takenQuizzes?.length > 0 ? (
              <>
                <TableContainer
                  component={Paper}
                  style={{
                    width: "90%",
                    border: "1px solid rgb(3, 165, 251)",
                    marginTop: "20px",
                  }}
                >
                  <Table>
                    <TableHead
                      style={{
                        backgroundColor: "rgb(3, 165, 251)",
                        textAlign: "center",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          style={{ color: "white", textAlign: "center" }}
                        >
                          Quiz Title
                        </TableCell>
                        <TableCell
                          style={{ color: "white", textAlign: "center" }}
                        >
                          Taken On
                        </TableCell>
                        <TableCell
                          style={{
                            color: "white",
                            textAlign: "center",
                            borderRight: "1px solid rgb(3, 165, 251)",
                          }}
                        >
                          Time Taken
                        </TableCell>
                        <TableCell
                          style={{ color: "white", textAlign: "center" }}
                        >
                          Correct Answers
                        </TableCell>
                        <TableCell
                          style={{ color: "white", textAlign: "center" }}
                        >
                          Incorrect Answers
                        </TableCell>
                        <TableCell
                          style={{ color: "white", textAlign: "center" }}
                        >
                          Score
                        </TableCell>
                        <TableCell
                          style={{ color: "white", textAlign: "center" }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          style={{ color: "white", textAlign: "center" }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {quizzesOnPage?.map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #E0E0E0",
                            }}
                          >
                            {quiz.quizTitle}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #E0E0E0",
                            }}
                          >
                            {new Date(quiz.takenOn).toLocaleString("bg-BG", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #E0E0E0",
                            }}
                          >
                            {quiz.timeTaken}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #E0E0E0",
                            }}
                          >
                            {quiz.correctAns
                              ? Object.keys(quiz.correctAns).length
                              : 0}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #E0E0E0",
                            }}
                          >
                            {Object.keys(quiz.answers).length -
                              (quiz.correctAns
                                ? Object.keys(quiz.correctAns).length
                                : 0)}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #E0E0E0",
                            }}
                          >
                            {quiz.score}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #E0E0E0",
                            }}
                          >
                            {quiz.type}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <Button
                              style={{
                                backgroundColor: "rgb(3, 165, 251)",
                                border: "1px solid white",
                              }}
                              variant="contained"
                              onClick={() => handleViewDetails(quiz)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  count={numberOfPages}
                  page={page}
                  onChange={handlePageChange}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: "rgb(0, 165, 251)",
                      color: "white",
                    },
                  }}
                />
              </>
            ) : (
              <h2
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                You haven&apos;t taken any quizzes yet.
              </h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TakenQuizzes;
