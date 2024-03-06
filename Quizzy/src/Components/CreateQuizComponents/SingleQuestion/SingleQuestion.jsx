import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Button, Grid, Typography } from "@mui/material";

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
      <Typography
        variant="h5"
        style={{ color: "rgb(3, 165, 251)", overflowWrap: "break-word" }}
      >
        {question.title}
      </Typography>
      <Box margin="15px">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {question.answers.map((answer, index) => (
            <Grid key={index} item xs={6}>
              <Box
                style={{
                  fontFamily: "Monospace",
                  cursor: "pointer",
                  borderRadius: "5px",

                  backgroundColor:
                    answer === question.correctAnswer
                      ? "rgba(144, 238, 144, 0.7)"
                      : "initial",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  boxShadow: "0px 0px 2px black",
                }}
              >
                {String.fromCharCode(97 + index)}. {answer}
                {answer === question.correctAnswer && (
                  <CheckCircleOutlineIcon
                    color="success"
                    style={{ marginLeft: "5px" }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap="15px"
        paddingRight="14px"
      >
        <Box display="flex" alignItems="center" gap="15px">
          <Typography>Points: {question.points}</Typography>
        </Box>
        <Button variant="contained" color="secondary" onClick={removeQuestion}>
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
