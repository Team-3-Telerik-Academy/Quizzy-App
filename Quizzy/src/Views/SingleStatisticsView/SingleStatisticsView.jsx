import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/quizzes.service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../services/users.service";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";

const SingleStatisticsView = () => {
  const [quiz, setQuiz] = useState(null);
  const [results, setResults] = useState(null);
  const [resultsOnPage, setResultsOnPage] = useState(null);
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("singleStatisticsView")) || 1
  );
  const [numberOfPages, setNumberOfPages] = useState(1);
  const number = 4;
  const { statisticsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("singleStatisticsView", page);
  }, [page]);

  useEffect(() => {
    getQuizById(statisticsId).then(async (result) => {
      setQuiz(result);
      const participantPromises = Object.keys(result.takenBy).map((user) =>
        getUserByUsername(user)
      );
      const participants = await Promise.all(participantPromises);
      const filteredQuizzes = participants.map((p) =>
        Object.keys(p.val().takenQuizzes)
          .map((key) => ({ ...p.val().takenQuizzes[key], key }))
          .filter((quiz) => quiz.id === statisticsId)
          .map((quiz) => ({
            ...quiz,
            participant: p.val().username,
            participantAvatar: p.val().image,
            key: quiz.key,
          }))
      );
      const flattenedQuizzes = filteredQuizzes.flat();
      flattenedQuizzes.sort((a, b) => b.score - a.score);
      setResults(flattenedQuizzes);
    });
  }, []);

  useEffect(() => {
    if (results) {
      setNumberOfPages(Math.ceil(results.length / number));
      setResultsOnPage(results.slice((page - 1) * number, page * number));
    }
  }, [results, page]);

  const handleViewComments = (result) => {
    navigate("/singleQuizStatistics/viewDetails", {
      state: { result: result, totalPoints: quiz.totalPoints },
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {quiz && resultsOnPage ? (
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
            {quiz?.title} Statistics
          </Typography>
          <span
            style={{
              marginBottom: "15px",
              color: "rgb(3, 165, 251)",
              fontSize: "16px",
            }}
          >
            <strong>Here are the statistics of your quiz:</strong>
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
              padding: "20px 0",
            }}
          >
            <div style={{ minWidth: "30%" }}>
              {resultsOnPage?.length > 0 ? (
                <>
                  <TableContainer
                    component={Paper}
                    style={{
                      border: "2px solid rgb(3, 165, 251)",
                      marginTop: "20px",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              whiteSpace: "nowrap",
                              borderRight: "1px solid #E0E0E0",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                top: "20px",
                                left: "80px",
                                fontWeight: "bold",
                              }}
                            >
                              Student
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                bottom: "20px",
                                left: "15px",
                                fontWeight: "bold",
                              }}
                            >
                              Question
                            </span>
                            <hr
                              style={{
                                transform: "rotate(-55deg)",
                                transformOrigin: "0 100%",
                                color: "#E0E0E0",
                                height: "180px",
                                position: "absolute",
                                top: "-80px",
                                left: "150px",
                              }}
                            />
                          </TableCell>
                          {resultsOnPage?.map((result, index) => (
                            <TableCell
                              key={index}
                              style={{
                                whiteSpace: "nowrap",
                                borderRight: "1px solid #E0E0E0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "15px",
                                }}
                              >
                                <Tooltip title="View Profile">
                                  <img
                                    onClick={() =>
                                      navigate(`/profile/${result.participant}`)
                                    }
                                    src={result.participantAvatar}
                                    alt={result.participant}
                                    style={{
                                      cursor: "pointer",
                                      height: "40px",
                                      width: "40px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip title="View details">
                                  <span
                                    onClick={() => handleViewComments(result)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {result.participant}
                                  </span>
                                </Tooltip>
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {quiz.questions &&
                          Object.values(quiz.questions).map((question, row) => (
                            <TableRow key={row}>
                              <TableCell
                                style={{
                                  whiteSpace: "nowrap",
                                  borderRight: "1px solid #E0E0E0",
                                }}
                              >
                                {question.title}
                              </TableCell>
                              {resultsOnPage?.map((result, index) => {
                                const answer = result.answers[row + 1];
                                const isCorrect = typeof answer === "string";
                                return (
                                  <TableCell
                                    key={index}
                                    style={{
                                      borderRight: "1px solid #E0E0E0",
                                      backgroundColor: isCorrect
                                        ? "green"
                                        : "red",
                                      whiteSpace: "nowrap",
                                    }}
                                  />
                                );
                              })}
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
                  No statistics available for this quiz!
                </h2>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SingleStatisticsView;
