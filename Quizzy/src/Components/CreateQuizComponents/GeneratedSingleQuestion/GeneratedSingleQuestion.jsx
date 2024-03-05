import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import toast from "react-hot-toast";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(3,165,251)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(3,165,251)',
          },
        },
      },
    },
  },
});

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
        paddingLeft="14px"
        paddingRight="14px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap="15px">
          <Typography>Choose Points:</Typography>
          <ThemeProvider theme={theme}>
          <TextField
            type="number"
            name="points"
            id="points"
            value={newQuestion.points}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, points: e.target.value })
            }
            inputProps={{ style: { height: "15px" } }}
            variant="outlined"
          />
          </ThemeProvider>
        </Box>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ backgroundColor: "rgb(3, 165,251)"}}
        >
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
