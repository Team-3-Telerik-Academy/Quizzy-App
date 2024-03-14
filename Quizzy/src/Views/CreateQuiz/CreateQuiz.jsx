import { useContext, useEffect, useState } from "react";
import { addQuiz, getQuizByTitle } from "../../services/quizzes.service";
import AppContext from "../../Context/AppContext";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { uploadImage } from "../../services/image.services";
import { getQuizQuestions } from "../../services/request-service";
import GeneratedSingleQuestion from "../../Components/CreateQuizComponents/GeneratedSingleQuestion/GeneratedSingleQuestion";
import SingleQuestion from "../../Components/CreateQuizComponents/SingleQuestion/SingleQuestion";
import WriteQuestionManually from "../../Components/CreateQuizComponents/WriteQuestionManually/WriteQuestionManually";
import { validateQuestion, validateQuiz } from "./validations";
import toast from "react-hot-toast";
import { getAllUsers } from "../../services/users.service";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  MenuItem,
  Container,
  Paper,
  Dialog,
  DialogContent,
  CircularProgress,
  Pagination,
} from "@mui/material";
import QuizImage from "../../Components/CreateQuizComponents/QuizImage/QuizImage";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3,165,251)",
    },
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(3,165,251)",
    },
  },
});

const StyledFormControl = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(3,165,251)",
    },
  },
});

const storage = getStorage();

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [generatedQuestionsPage, setGeneratedQuestionsPage] = useState(1);
  const [questionsPage, setQuestionsPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [quiz, setQuiz] = useState({
    title: "",
    image: "",
    type: "",
    category: "",
    difficulty: "",
    timer: "0",
    totalPoints: 0,
    invitedUsers: [],
    questions: [],
    generated: false,
    activeNumber: 1,
    activeTimeUnit: "minutes",
    file: null,
    ongoingTill: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString("en-CA"),
  });

  useEffect(() => {
    if (quiz.type === "private") {
      getAllUsers().then(setUsers);
    }
  }, [quiz.type]);

  const handleQuestionsPageChange = (event, value) => {
    setQuestionsPage(value);
  };

  const handleGeneratedQuestionsPageChange = (event, value) => {
    setGeneratedQuestionsPage(value);
  };

  const generateQuestions = () => {
    if (!quiz.category || !quiz.difficulty) {
      toast.error("Please select category and difficulty first!");
      return;
    }

    getQuizQuestions(quiz.category, quiz.difficulty).then(
      setGeneratedQuestions
    );
  };

  const addGeneratedQuestion = (question) => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, question],
      totalPoints: quiz.totalPoints + Number(question.points),
    });
    setGeneratedQuestions(
      generatedQuestions.filter((el) => el.title !== question.title)
    );
  };

  const addQuestion = (question) => {
    if (validateQuestion(question)) return;

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, question],
      totalPoints: quiz.totalPoints + Number(question.points),
    });
    setShowQuizForm(false);
  };

  const removeQuestion = (question) => {
    if (question.generated) {
      setGeneratedQuestions([...generatedQuestions, question]);
    }

    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((el) => el.title !== question.title),
      totalPoints: quiz.totalPoints - Number(question.points),
    });
  };

  const updateQuiz = (prop) => (e) => {
    setQuiz({
      ...quiz,
      [prop]: e.target.value,
    });
  };

  const handleAddQuiz = () => {
    if (validateQuiz(quiz)) return;

    let promise;

    if (quiz.image) {
      const pastStorageRef = ref(
        storage,
        "createQuizImage/" + userData.username
      );
      const newStorageRef = ref(storage, "quizzesImages/" + quiz.title);

      promise = deleteObject(pastStorageRef)
        .then(() => setQuiz({ ...quiz, image: "" }))
        .then(() => uploadImage(newStorageRef, quiz.file));
    } else {
      promise = Promise.resolve();
    }

    promise
      .then((downloadURL) =>
        getQuizByTitle(quiz.title).then((snapshot) => ({
          snapshot,
          downloadURL,
        }))
      )
      .then(({ snapshot, downloadURL }) => {
        if (snapshot.exists()) {
          toast.error(`Quiz with title '${quiz.title}' has already exists!`);
          throw new Error(
            `Quiz with title '${quiz.title}' has already exists!`
          );
        }
        setCreatingQuiz(true);
        return addQuiz(
          quiz.title,
          quiz.questions,
          downloadURL,
          quiz.difficulty,
          quiz.timer,
          quiz.totalPoints,
          quiz.type,
          quiz.category,
          quiz.invitedUsers,
          userData.username,
          quiz.ongoingTill
        );
      })
      .then()
      .then(() => navigate("/createQuizSuccess"));
  };

  return (
    <>
      <Dialog open={creatingQuiz}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <div style={{ margin: "60px 0" }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            style={{ padding: "20px", background: "#f5f5f5" }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "#394E6A", fontFamily: "Fantasy" }}
            >
              Create new Quiz:
            </Typography>
            <StyledTextField
              value={quiz.title}
              onChange={updateQuiz("title")}
              type="text"
              name="quizTitle"
              id="quizTitle"
              placeholder="Quiz Title"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <QuizImage quiz={quiz} setQuiz={setQuiz} />
            <Typography
              variant="h6"
              style={{ color: "rgb(3,165,251)" }}
              marginBottom="5px"
            >
              Active Till:
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <StyledFormControl style={{ marginBottom: "15px", flex: 1 }}>
                <TextField
                  type="date"
                  value={quiz.ongoingTill}
                  onChange={updateQuiz("ongoingTill")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </StyledFormControl>
            </Box>
            <FormControl component="fieldset">
              <ThemeProvider theme={theme}>
                <FormLabel component="legend">Type:</FormLabel>
                <RadioGroup
                  style={{ display: "flex", flexDirection: "row" }}
                  name="quizType"
                  value={quiz.type}
                  onChange={updateQuiz("type")}
                >
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="Public"
                  />
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                </RadioGroup>
              </ThemeProvider>
              <Box
                id="upload-image"
                marginBottom={2}
                display="flex"
                alignItems="center"
                flexWrap="wrap"
              >
                {quiz.type === "private" && (
                  <ThemeProvider theme={theme}>
                    <FormLabel
                      component="legend"
                      style={{ marginRight: "15px" }}
                    >
                      Invite Users:
                    </FormLabel>
                    {users?.map((user) => (
                      <>
                        {user.username !== userData.username && (
                          <FormControlLabel
                            key={user.username}
                            control={
                              <Checkbox
                                value={user.username}
                                onChange={(e) =>
                                  setQuiz({
                                    ...quiz,
                                    invitedUsers: e.target.checked
                                      ? [...quiz.invitedUsers, user.username]
                                      : quiz.invitedUsers.filter(
                                          (el) => el !== user.username
                                        ),
                                  })
                                }
                              />
                            }
                            label={user.username}
                          />
                        )}
                      </>
                    ))}
                  </ThemeProvider>
                )}
              </Box>
            </FormControl>
            <ThemeProvider theme={theme}>
              <TextField
                select
                fullWidth
                value={quiz.timer}
                onChange={updateQuiz("timer")}
                label="Timer:"
                variant="outlined"
                style={{ marginBottom: "15px" }}
              >
                <MenuItem value="0">No Timer</MenuItem>
                <MenuItem value="30">30 minutes</MenuItem>
                <MenuItem value="60">60 minutes</MenuItem>
                <MenuItem value="90">90 minutes</MenuItem>
                <MenuItem value="120">120 minutes</MenuItem>
              </TextField>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <TextField
                select
                fullWidth
                value={quiz.category}
                onChange={(e) => {
                  updateQuiz("category")(e);
                  setGeneratedQuestions(null);
                }}
                label="Category:"
                variant="outlined"
              >
                <MenuItem value="9">General Knowledge</MenuItem>
                <MenuItem value="18">Computers</MenuItem>
                <MenuItem value="22">Geography</MenuItem>
                <MenuItem value="23">History</MenuItem>
                <MenuItem value="19">Math</MenuItem>
                <MenuItem value="17">Science & Nature</MenuItem>
              </TextField>
            </ThemeProvider>
            <FormControl
              component="fieldset"
              fullWidth
              style={{ marginTop: "15px" }}
            >
              <ThemeProvider theme={theme}>
                <FormLabel component="legend">Difficulty:</FormLabel>
                <RadioGroup
                  style={{ display: "flex", flexDirection: "row" }}
                  name="difficulty"
                  value={quiz.difficulty}
                  onChange={(e) => {
                    updateQuiz("difficulty")(e);
                    setGeneratedQuestions(null);
                  }}
                >
                  <FormControlLabel
                    value="easy"
                    control={<Radio />}
                    label="Easy"
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="hard"
                    control={<Radio />}
                    label="Hard"
                  />
                </RadioGroup>
              </ThemeProvider>
            </FormControl>
            <div id="quiz-questions">
              {showQuizForm ? (
                <WriteQuestionManually
                  addQuestion={addQuestion}
                  cancelQuestion={() => setShowQuizForm(false)}
                />
              ) : (
                <>
                  <Button
                    style={{
                      marginTop: "10px",
                      backgroundColor: "rgb(3, 165, 251)",
                    }}
                    variant="contained"
                    onClick={() => setShowQuizForm(true)}
                  >
                    Write Question Manually
                  </Button>
                  <br />
                  {!generatedQuestions && (
                    <Button
                      style={{
                        marginTop: "10px",
                        backgroundColor: "rgb(3, 165, 251)",
                      }}
                      variant="contained"
                      onClick={generateQuestions}
                    >
                      Generate Me Example Questions
                    </Button>
                  )}
                </>
              )}
            </div>
            {generatedQuestions && (
              <>
                <hr />
                <Typography variant="h4" marginTop="15px">
                  Generated Questions:
                </Typography>
                <GeneratedSingleQuestion
                  key={generatedQuestions[generatedQuestionsPage - 1].title}
                  question={generatedQuestions[generatedQuestionsPage - 1]}
                  addQuestion={addGeneratedQuestion}
                />
                <Pagination
                  count={generatedQuestions.length}
                  page={generatedQuestionsPage}
                  onChange={handleGeneratedQuestionsPageChange}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: "rgb(0, 165, 251)",
                      color: "white",
                    },
                  }}
                />
              </>
            )}
            {quiz?.questions?.length > 0 && (
              <>
                <hr />
                <Typography variant="h4" marginTop="15px">
                  Added Questions:
                </Typography>
                <SingleQuestion
                  key={[...quiz.questions].reverse()[questionsPage - 1].title}
                  question={[...quiz.questions].reverse()[questionsPage - 1]}
                  removeQuestion={() =>
                    removeQuestion(
                      [...quiz.questions].reverse()[questionsPage - 1]
                    )
                  }
                />
                <Pagination
                  count={quiz.questions.length}
                  page={questionsPage}
                  onChange={handleQuestionsPageChange}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: "rgb(0, 165, 251)",
                      color: "white",
                    },
                  }}
                />
              </>
            )}
          </Paper>
        </Container>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          marginTop={2}
          gap="5.8vw"
        >
          <Typography variant="h5" style={{ marginTop: "11.5px" }}>
            Total Number of Questions: {quiz.questions.length}
          </Typography>
          <Typography variant="h5" style={{ marginTop: "11.5px" }}>
            Total Quiz Points: {quiz.totalPoints}
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddQuiz}
            sx={{
              fontSize: "20px",
              padding: "10px",
              backgroundColor: "rgb(3, 165, 251)",
            }}
          >
            Create Quiz
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CreateQuiz;
