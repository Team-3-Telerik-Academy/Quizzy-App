import { useState } from "react";
import { useParams } from "react-router-dom";
import { quizzesData } from "../PublicQuizzes/PublicQuizzes";
import {
  Box,
  Typography,
  Button,
  Pagination,
  Grid,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(3,165,251)",
      contrastText: "#ffffff",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const objQuestions = {
  id: 1,
  questions: [
    {
      question: "What does HTML stand for?",
      options: [
        { option: "Hyper Text Markup Language", value: 1 },
        { option: "Hyperlinks and Text Markup Language", value: 2 },
        { option: "Home Tool Markup Language", value: 3 },
      ],
      answer: 1,
    },
    {
      question: "Choose the correct HTML element for the largest heading?",
      options: [
        { option: "<heading>", value: 1 },
        { option: "<h1>", value: 2 },
        { option: "<h6>", value: 3 },
        { option: "<head>", value: 4 },
      ],
      answer: 2,
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: [
        { option: "<lb>", value: 1 },
        { option: "<br>", value: 2 },
        { option: "<break>", value: 3 },
      ],
      answer: 3,
    },
  ],
};

const PublicQuizView = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [questionaryView, setQuestionaryView] = useState(true);
  const [resultView, setResultView] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [questionNumber, setQuestionNumber] = useState(0);
  const [points, setPoits] = useState({});
  console.log(points);
  const handleClick = (option, value, answer, page) => {
    setSelectedItem({ ...selectedItem, [page]: option });
    if (value === answer) {
      setPoits({ ...points, [page]: 1 });
    } else {
      setPoits({ ...points, [page]: 0 });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
    setIndex(value - 1);
  };

  const handleview = () => {
    setQuestionaryView(false);
    setResultView(true);
  };

  const question = objQuestions.questions;
  const length = objQuestions.questions.length;

  return (
    <>
      {questionaryView && (
        <Box
          sx={{
            boxShadow: 4,
            width: "600px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <span style={{ color: "#394E6A", fontFamily: "Fantasy" }}>
            Question
            <span style={{ fontSize: "23px", marginLeft: "7px" }}>
              {index + 1}
            </span>{" "}
            / {length}
          </span>
          <Typography
            style={{ fontFamily: "fantasy", color: "#394E6A" }}
            variant="h5"
          >
            {question[index].question}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {question[index].options.map((option) => {
              return (
                <Grid item xs={6}>
                  <Item
                    style={{
                      fontFamily: "Monospace",
                      cursor: "pointer",
                      backgroundColor:
                        selectedItem[page] === option
                          ? "rgb(3,165,251)"
                          : "initial",
                      color:
                        selectedItem[page] === option
                          ? "#ffffff"
                          : theme.palette.text.secondary,
                    }}
                    onClick={() =>
                      handleClick(
                        option,
                        option.value,
                        question[index].answer,
                        page
                      )
                    }
                  >
                    {option.option}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
          <ThemeProvider theme={theme}>
            <Pagination
              count={length}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          </ThemeProvider>
          <Button
            style={{
              backgroundColor: "rgb(3,165,251)",
              color: "white",
              width: "130px",
            }}
            onClick={handleview}
          >
            Submit
          </Button>
        </Box>
      )}
      {resultView && <Box>HELLO</Box>}
    </>
  );
};

export default PublicQuizView;
