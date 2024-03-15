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
  Button,
  Pagination,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../services/users.service";
import { useEffect, useState } from "react";

const SingleStatisticsView = () => {
  const [quiz, setQuiz] = useState(null);
  const [results, setResults] = useState(null);
  const [resultsOnPage, setResultsOnPage] = useState(null);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const number = 5;
  const { statisticsId } = useParams();
  const navigate = useNavigate();

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
          .sort((a, b) => b.score - a.score)
          .map((quiz) => ({
            ...quiz,
            participant: p.val().username,
            participantAvatar: p.val().image,
            key: quiz.key,
          }))
      );
      const flattenedQuizzes = filteredQuizzes.flat();
      setResults(flattenedQuizzes);
    });
  }, []);

  useEffect(() => {
    if (results) {
      setNumberOfPages(Math.ceil(results.length / number));
      setResultsOnPage(results.slice((page - 1) * number, page * number));
    }
  }, [results]);

  const handleViewDetails = (answers) => {
    navigate("/takenQuizzes/details", { state: { answers: answers } });
  };

  const handleViewComments = (result) => {
    navigate("/takenQuizzes/comments", { state: { result: result } });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setResultsOnPage(results.slice((value - 1) * number, value * number));
  };

  return (
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
        }}
      >
        {results?.length > 0 ? (
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
                    <TableCell style={{ color: "white", textAlign: "center" }}>
                      Place
                    </TableCell>
                    <TableCell style={{ color: "white", textAlign: "center" }}>
                      Participant
                    </TableCell>
                    <TableCell style={{ color: "white", textAlign: "center" }}>
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
                    <TableCell style={{ color: "white", textAlign: "center" }}>
                      Correct Answers
                    </TableCell>
                    <TableCell style={{ color: "white", textAlign: "center" }}>
                      Incorrect Answers
                    </TableCell>
                    <TableCell style={{ color: "white", textAlign: "center" }}>
                      Score
                    </TableCell>
                    <TableCell style={{ color: "white", textAlign: "center" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultsOnPage?.map((result, index) => (
                    <TableRow key={result.participant}>
                      <TableCell
                        style={{
                          textAlign: "center",
                          borderRight: "1px solid #E0E0E0",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        style={{
                          borderRight: "1px solid #E0E0E0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "15px",
                        }}
                      >
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
                        {result.participant}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          borderRight: "1px solid #E0E0E0",
                        }}
                      >
                        {new Date(result.takenOn).toLocaleString("bg-BG", {
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
                        {result.timeTaken}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          borderRight: "1px solid #E0E0E0",
                        }}
                      >
                        {result.correctAns
                          ? Object.keys(result.correctAns).length
                          : 0}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          borderRight: "1px solid #E0E0E0",
                        }}
                      >
                        {Object.keys(result.answers).length -
                          (result.correctAns
                            ? Object.keys(result.correctAns).length
                            : 0)}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          borderRight: "1px solid #E0E0E0",
                        }}
                      >
                        {result.score}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Button
                          style={{
                            backgroundColor: "rgb(3, 165, 251)",
                            border: "1px solid white",
                            marginRight: "5px",
                          }}
                          variant="contained"
                          onClick={() => handleViewDetails(result.answers)}
                        >
                          Details
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "rgb(3, 165, 251)",
                            border: "1px solid white",
                          }}
                          variant="contained"
                          onClick={() => handleViewComments(result)}
                        >
                          Comments
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
            No statistics available for this quiz!
          </h2>
        )}
      </div>
    </div>
  );
};

export default SingleStatisticsView;
