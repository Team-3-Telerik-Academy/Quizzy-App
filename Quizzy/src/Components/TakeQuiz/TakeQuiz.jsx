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
import PropTypes from "prop-types";

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

/**
 * Renders a quiz component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.minutes - The number of minutes for the quiz.
 * @param {string} props.formattedSeconds - The formatted seconds for the quiz.
 * @param {string} props.buttonColor - The color of the button.
 * @param {Object} props.quiz - The quiz object.
 * @param {number} props.index - The index of the current question.
 * @param {number} props.length - The total number of questions.
 * @param {Array} props.questions - The array of questions.
 * @param {number} props.page - The current page number.
 * @param {Object} props.selectedItem - The selected item object.
 * @param {Function} props.handleView - The function to handle the view.
 * @param {Function} props.handleChange - The function to handle the change.
 * @param {Function} props.handleClick - The function to handle the click.
 * @param {number} props.questionPoint - The point value of each question.
 * @returns {JSX.Element} The rendered TakeQuiz component.
 */
const TakeQuiz = ({
  minutes,
  formattedSeconds,
  buttonColor,
  quiz,
  index,
  length,
  questions,
  page,
  selectedItem,
  handleView,
  handleChange,
  handleClick,
  questionPoint,
}) => {
  return (
    <>
      <Box
        sx={{
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          style={{
            color: "#394E6A",
            fontFamily: "Fantasy",
            marginTop: "30px",
            marginBottom: "5px",
            fontSize: "25px",
          }}
        >
          {quiz.title} Quiz
        </Typography>

        {minutes > 0 && (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              fontFamily: "cursive",
              color: "#394E6A",
              fontSize: "17px",
              minWidth: "45%",
              marginBottom: "5px",
            }}
          >
            {" "}
            Time left: {minutes - 1}:{formattedSeconds}
          </Typography>
        )}
        <Box
          sx={{
            boxShadow: 4,
            width: "45%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              color: "#394E6A",
              fontFamily: "Fantasy",
              marginBottom: "10px",
            }}
          >
            Question
            <span style={{ fontSize: "23px", marginLeft: "7px" }}>
              {index + 1}
            </span>{" "}
            / {length}
          </span>
          <Typography
            style={{
              fontFamily: "fantasy",
              color: "#394E6A",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
            variant="h5"
          >
            {questions[index]?.title}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {questions[index]?.answers?.map((question) => {
              return (
                <Grid key={question} item xs={6}>
                  <Item
                    sx={{
                      fontFamily: "Monospace",
                      cursor: "pointer",
                      backgroundColor:
                        selectedItem[page] === question
                          ? "rgb(3,165,251)"
                          : "initial",
                      color:
                        selectedItem[page] === question
                          ? "#ffffff"
                          : theme.palette.text.secondary,
                      "&:hover": {
                        backgroundColor:
                          selectedItem[page] === question
                            ? buttonColor
                            : "#EBECF0",
                      },
                      transition: "transform 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    onClick={() =>
                      handleClick(
                        question,
                        questions[index].correctAnswer,
                        page,
                        questionPoint
                      )
                    }
                  >
                    {question}
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
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            />
          </ThemeProvider>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: buttonColor,
                color: "white",
                width: "130px",
                display: "flex",
                marginTop: "14px",
              }}
              onClick={handleView}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

TakeQuiz.propTypes = {
  minutes: PropTypes.number,
  formattedSeconds: PropTypes.string,
  buttonColor: PropTypes.string,
  quiz: PropTypes.object,
  index: PropTypes.number,
  length: PropTypes.number,
  questions: PropTypes.array,
  page: PropTypes.number,
  selectedItem: PropTypes.object,
  handleView: PropTypes.func,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  questionPoint: PropTypes.number,
};

export default TakeQuiz;
