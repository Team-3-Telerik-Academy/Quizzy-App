import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Button, Typography } from "@mui/material";

const SingleQuestion = ({ question, removeQuestion }) => {
  return (
    <Box
      sx={{
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
        ))}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-evenly">
        <Box display="flex" alignItems="center" gap="15px">
          <Typography>Points: {question.points}</Typography>
        </Box>
        <Button
          variant="contained"
            color="secondary"
          onClick={removeQuestion}
        >
          Remove Question
        </Button>
      </Box>
    </Box>
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.object,
  removeQuestion: PropTypes.func,
};

export default SingleQuestion;
