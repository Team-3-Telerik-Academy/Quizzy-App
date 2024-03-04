import { Box, Grid, Paper, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

// const handleClick = (setQuestionaryView, setResultView, id, navigate) => {
//   setQuestionaryView(true);
//   setResultView(false);

//   return navigate(`/publicQuizzes/${id}`);
// };

const QuizResult = ({
  score,
  length,
  answers,
  //   id,
  //   setQuestionaryView,
  //   setResultView,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Box>{((score / length) * 100).toFixed(2)}%</Box>
      <Box
        sx={{
          boxShadow: 4,
          width: "500px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
        </Grid>
      </Box>
      {/* <Button
        onClick={() =>
          handleClick(setQuestionaryView, setResultView, id, navigate)
        }
      >
        Retry Quiz
      </Button> */}
    </>
  );
};

export default QuizResult;
