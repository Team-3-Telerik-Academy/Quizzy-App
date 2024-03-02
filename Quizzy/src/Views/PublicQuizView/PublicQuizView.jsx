import { useState } from "react";
import { useParams } from "react-router-dom";
import { quizzesData } from "../PublicQuizzes/PublicQuizzes";
import { Box, Typography, Button, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(3,165,251)",
      contrastText: '#ffffff'
    },
  },
});

// question.question, question.options.map , question.answer

const objQuestions = {
  id: 1,
  questions: [
    {
      question: "What does HTML stand for?",
      options: [
        { option: "Hyper Text Markup Language" },
        { option: "Hyperlinks and Text Markup Language" },
        { option: "Home Tool Markup Language" },
      ],
      answer: 1,
    },
    {
      question: "Choose the correct HTML element for the largest heading?",
      options: [
        { option: "<heading>" },
        { option: "<h1>" },
        { option: "<h6>" },
        { option: "<head>" },
      ],
      answer: 2,
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: [{ option: "<lb>" }, { option: "<br>" }, { option: "<break>" }],
      answer: 3,
    },
  ],
};

const PublicQuizView = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);

  const question = objQuestions.questions;
  const length = objQuestions.questions.length;

  return (
    <Box
      sx={{
        boxShadow: 4,
        width: "400px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span>
        {index + 1} / {length}
      </span>
      <Typography variant="h5">{question[index].question}</Typography>
      {question[index].options.map((option) => {
        return (
          <Typography variant="span" sx={{ cursor: "pointer" }}>
            {option.option}
          </Typography>
        );
      })}
      <ThemeProvider theme={theme}>
        <Pagination count={length} color="primary" page={index} />
      </ThemeProvider>
      <Button>Submit</Button>
    </Box>
  );
};

export default PublicQuizView;
