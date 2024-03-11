import { Box, Typography, Paper } from "@mui/material";

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

const ResultDetails = ({ answers }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#F3F4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontFamily: "fantasy", color: "#394E6A", marginTop: "20px" }}
      >
        Detailed Analysis of your results:
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "25px",
          gap: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            height: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "fantasy",
              color: "rgb(3,165,251)",
              marginBottom: "2px",
            }}
          >
            Correct Answers
          </Typography>

          {Object.values(answers).map((answer, index) => {
            if (typeof answer === "string") {
              return (
                <Item
                  key={answer}
                  sx={{
                    marginBottom: "7px",
                    backgroundColor: "#00C853",
                    color: "white",
                  }}
                >
                  Question {`${index + 1}: ${answer}`}
                </Item>
              );
            }
          })}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            height: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "fantasy",
              color: "rgb(3,165,251)",
              marginBottom: "2px",
            }}
          >
            Incorrect Answers
          </Typography>

          {Object.values(answers).map((answer, questionIndex) => {
            if (typeof answer === "object") {
              return answer.map((incorrectAns, incorrectAnsIndex) => {
                if (incorrectAnsIndex === 0) {
                  return (
                    <Item
                      key={answer}
                      sx={{
                        marginBottom: "7px",
                        backgroundColor: " #E91E63",
                        color: "white",
                      }}
                    >
                      Question {`${questionIndex + 1}: ${incorrectAns}`}
                    </Item>
                  );
                }
              });
            }
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ResultDetails;
