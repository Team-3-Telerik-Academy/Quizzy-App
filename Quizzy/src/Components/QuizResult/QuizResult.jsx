import {
  Box,
  Grid,
  Paper,
  Button,
  Container,
  CircularProgress,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import time from "..//../Images/time.svg";
import correct from "..//../Images/correct.svg";
import incorrect from "..//../Images/incorrect.svg";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(3,165,251)",
      contrastText: "#ffffff",
    },
  },
});

// const handleClick = (
//   navigate,
//   id,
//   setQuestionaryView,
//   setResultView,
//   setIndex,
//   setPage,
//   quiz,
//   setMinutes,
//   setSeconds,
//   setPoits,
//   setSelectedItem,
//   setScore
// ) => {
//   setQuestionaryView(true);
//   setResultView(false);
//   setIndex(0);
//   setPage(1);
//   setMinutes(quiz.timer);
//   setSeconds(59);
//   setPoits({});
//   setSelectedItem({});
//   setScore(0);
//   return navigate(`/publicQuizzes/${id}`);
// };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const QuizResult = ({
  score,
  length,
  answers,
  id,
  setQuestionaryView,
  setResultView,
  setIndex,
  setPage,
  quiz,
  setMinutes,
  setSeconds,
  setPoits,
  setSelectedItem,
  setScore,
  correctAns,
  timeTaken,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F3F4f6"
        }}
      >
        <Container sx={{ marginTop: "50px", display: "flex",gap:'150px' }}>
          <Box
            sx={{
              boxShadow: 5,
              width: "300px",
              height: "300px",
              display: "flex",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "6px solid rgb(3,165,251)",
            }}
          >
            <span
              style={{
                fontFamily: "fantasy",
                color: "#394E6A",
                fontSize: "30px",
              }}
            >
              <span style={{ fontSize: "40px" }}>
                Your score: <br />
              </span>
              {((score / length) * 100).toFixed(2)}%
            </span>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ display: "flex", gap: "10px" }}>
              <img
                src={correct}
                style={{ width: "30px", height: "30px" }}
                alt=""
              />{" "}
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "#394E6A",
                }}
              >
                {Object.values(correctAns).length} correct answers.
              </span>
            </Typography>
            <Typography sx={{ display: "flex", gap: "10px" }}>
              <img
                src={incorrect}
                style={{ width: "30px", height: "30px" }}
                alt=""
              />{" "}
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "#394E6A",
                }}
              >
                {" "}
                {length - Object.values(correctAns).length} incorrect answers.
              </span>
            </Typography>

            <Typography sx={{ display: "flex", gap: "10px" }}>
              <img
                src={time}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />{" "}
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "#394E6A",
                }}
              >
                {timeTaken}
              </span>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* <Button
        onClick={() =>
          handleClick(
            navigate,
            id,
            setQuestionaryView,
            setResultView,
            setIndex,
            setPage,
            quiz,
            setMinutes,
            setSeconds,
            setPoits,
            setSelectedItem,
            setScore
          )
        }
      >
        retry
      </Button> */}
    </>
  );
};

export default QuizResult;

{
  /* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
{Object.values(answers).map((answer) => {
  if (typeof answer === "string") {
    return (
      <Grid item xs={12}>
        <Item
          sx={{
            fontFamily: "Monospace",
            cursor: "pointer",
            backgroundColor: "green",
            color: "#ffffff",
          }}
        >
          {answer}
        </Item>
      </Grid>
    );
  } else {
    return answer.map((answer, index) => {
      return (
        <Grid item xs={6}>
          <Item
            sx={{
              fontFamily: "Monospace",
              cursor: "pointer",

              backgroundColor: index === 0 ? "red" : "green",

              color: "#ffffff",
            }}
          >
            <span>{answer}</span>
          </Item>
        </Grid>
      );
    });
  }
})}
</Grid> */
}
