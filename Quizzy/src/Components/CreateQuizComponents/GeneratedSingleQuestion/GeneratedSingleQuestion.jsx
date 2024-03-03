import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import toast from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";

const GeneratedSingleQuestion = ({ question, addQuestion }) => {
  const [newQuestion, setNewQuestion] = useState(question);

  const handleClick = () => {
    if (newQuestion.points < 1) {
      toast.error("The points cannot be less than 1!");
      return;
    }

    addQuestion(newQuestion);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(3, 165, 251, 0.15)",
        border: "2px solid rgb(3, 165, 251)",
        borderRadius: "10px",
        margin: "15px",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
        },
        textAlign: "center",
        padding: "15px",
      }}
    >
      <Typography variant="h5" style={{ color: "rgb(3, 165, 251)" }}>
        {question.title}
      </Typography>
      <Box margin="15px">
        {question.answers.map((answer, index) => (
          <>
            <Typography
              key={index}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              marginBottom="5px"
            >
              <Typography>
                {String.fromCharCode(97 + index)}. {answer}
              </Typography>
              {answer === question.correctAnswer && (
                <CheckCircleOutlineIcon
                  color="success"
                  style={{ marginLeft: "5px" }}
                />
              )}
            </Typography>
          </>
        ))}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-evenly">
        <Box display="flex" alignItems="center" gap="15px">
          <Typography>Points:</Typography>

          <TextField
            type="number"
            name="points"
            id="points"
            value={newQuestion.points}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, points: e.target.value })
            }
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add Question
        </Button>
      </Box>
    </Box>
  );
};

GeneratedSingleQuestion.propTypes = {
  question: PropTypes.object,
  addQuestion: PropTypes.func,
};

export default GeneratedSingleQuestion;
