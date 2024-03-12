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
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const TakenQuizzes = () => {
  const [takenQuizzes, setTakenQuizzes] = useState(null);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getTakenQuizzesByUser(userData.username).then(setTakenQuizzes);
  }, []);

  const handleViewDetails = (answers) => {
    navigate('/takenQuizzes/details', { state: { answers: answers } });
  };

  return (
    <div>
      <h1>Taken Quizzes</h1>
      <p>Here are the quizzes you have taken:</p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quiz Title</TableCell>
              <TableCell>Taken On</TableCell>
              <TableCell>Time Taken</TableCell>
              <TableCell>Correct Answers</TableCell>
              <TableCell>Incorrect Answers</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {takenQuizzes?.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell>{quiz.quizTitle}</TableCell>
                <TableCell>{quiz.takenOn}</TableCell>
                <TableCell>{quiz.timeTaken}</TableCell>
                <TableCell>
                  {quiz.correctAns ? Object.keys(quiz.correctAns).length : 0}
                </TableCell>
                <TableCell>
                  {Object.keys(quiz.answers).length -
                    (quiz.correctAns ? Object.keys(quiz.correctAns).length : 0)}
                </TableCell>
                <TableCell>{quiz.score}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(quiz.answers)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TakenQuizzes;
