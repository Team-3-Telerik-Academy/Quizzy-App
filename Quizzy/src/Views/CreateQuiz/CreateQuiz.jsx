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
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
} from "@mui/material";
import QuizImage from "../../Components/CreateQuizComponents/QuizImage/QuizImage";

const storage = getStorage();

const numbers = Array.from({ length: 60 }, (_, i) => i + 1);

const timeUnits = [
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
];

const convertToMinutes = (number, timeUnit) => {
  const multipliers = {
    minutes: 1,
    hours: 60,
    days: 24 * 60,
    weeks: 7 * 24 * 60,
  };

  return number * multipliers[timeUnit];
};

const CreateQuiz = () => {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState(null);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
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
  });

  useEffect(() => {
    if (quiz.type === "private") {
      getAllUsers().then(setUsers);
    }
  }, [quiz.type]);

  const generateQuestions = () => {
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
    const activeTimeInMinutes = convertToMinutes(
      quiz.activeNumber,
      quiz.activeTimeUnit
    );
    if (validateQuiz(quiz)) return;

    let promise;

    if (quiz.image) {
      const pastStorageRef = ref(
        storage,
        "createQuizImage/" + userData.username
      );
      const newStorageRef = ref(storage, "quizzesImages/" + quiz.title);

      promise = deleteObject(pastStorageRef).then(() => setQuiz({ ...quiz, image: "" }))
        .then(() => uploadImage(newStorageRef, quiz.file))
    } else {
      promise = Promise.resolve();
    }

    promise
      .then((downloadURL) => getQuizByTitle(quiz.title).then((snapshot) => ({ snapshot, downloadURL })))
      .then(({ snapshot, downloadURL }) => {
        if (snapshot.exists()) {
          toast.error(`Quiz with title '${quiz.title}' has already exists!`);
          throw new Error(
            `Quiz with title '${quiz.title}' has already exists!`
          );
        }
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
          activeTimeInMinutes
        );
      })
      .then(() => {
        toast.success("Quiz has been successfully created!");
        setQuiz({
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
        });
        setGeneratedQuestions(null);
      });
  };

  return (
    <div style={{ margin: "70px 0" }}>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", background: "#f5f5f5" }}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Create new Quiz:
          </Typography>
          <TextField
            value={quiz.title}
            onChange={updateQuiz("title")}
            type="text"
            name="quizTitle"
            id="quizTitle"
            placeholder="Quiz Title"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <QuizImage quiz={quiz} setQuiz={setQuiz} />
          <Typography variant="h6" color="primary" marginBottom="5px">
            Active Time For The Quiz:
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <FormControl
              style={{ marginBottom: "15px", flex: 1, marginRight: "10px" }}
            >
              <Select
                value={quiz.activeNumber}
                onChange={updateQuiz("activeNumber")}
              >
                {numbers.map((number) => (
                  <MenuItem key={number} value={number}>
                    {number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              style={{ marginBottom: "15px", flex: 1, marginLeft: "10px" }}
            >
              <Select
                value={quiz.activeTimeUnit}
                onChange={updateQuiz("activeTimeUnit")}
              >
                {timeUnits.map((unit) => (
                  <MenuItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormControl component="fieldset">
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
            <Box
              id="upload-image"
              marginBottom={2}
              display="flex"
              alignItems="center"
              flexWrap="wrap"
            >
              {quiz.type === "private" && (
                <>
                  <FormLabel component="legend" style={{ marginRight: "15px" }}>
                    Choose Users:
                  </FormLabel>
                  {users?.map((user) => (
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
                  ))}
                </>
              )}
            </Box>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel>Timer:</InputLabel>
            <Select value={quiz.timer} onChange={updateQuiz("timer")}>
              <MenuItem value="0">No Timer</MenuItem>
              <MenuItem value="30">30 minutes</MenuItem>
              <MenuItem value="60">60 minutes</MenuItem>
              <MenuItem value="90">90 minutes</MenuItem>
              <MenuItem value="120">120 minutes</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Category:</InputLabel>
            <Select
              value={quiz.category}
              onChange={(e) => {
                updateQuiz("category")(e);
                setGeneratedQuestions(null);
              }}
            >
              <MenuItem value="9">General Knowledge</MenuItem>
              <MenuItem value="18">Computers</MenuItem>
              <MenuItem value="22">Geography</MenuItem>
              <MenuItem value="23">History</MenuItem>
              <MenuItem value="19">Math</MenuItem>
              <MenuItem value="17">Science & Nature</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            component="fieldset"
            fullWidth
            style={{ marginTop: "15px" }}
          >
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
              <FormControlLabel value="easy" control={<Radio />} label="Easy" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="hard" control={<Radio />} label="Hard" />
            </RadioGroup>
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
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => setShowQuizForm(true)}
                >
                  Write Question Manually
                </Button>
                <br />
                {!generatedQuestions && (
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="primary"
                    onClick={generateQuestions}
                  >
                    Generate Me Example Questions
                  </Button>
                )}
              </>
            )}
          </div>
          {quiz?.questions?.length > 0 && (
            <>
              <hr />
              <Typography variant="h4" marginTop="15px">
                Added Questions:
              </Typography>
              {[...quiz.questions].reverse().map((question) => (
                <SingleQuestion
                  key={question.title}
                  question={question}
                  removeQuestion={() => removeQuestion(question)}
                />
              ))}
            </>
          )}
          {generatedQuestions && (
            <>
              <hr />
              <Typography variant="h4" marginTop="15px">
                Generated Questions:
              </Typography>
              {generatedQuestions.map((question) => (
                <GeneratedSingleQuestion
                  key={question.title}
                  question={question}
                  addQuestion={addGeneratedQuestion}
                />
              ))}
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
          color="primary"
          onClick={handleAddQuiz}
          sx={{
            fontSize: "20px",
            padding: "10px",
          }}
        >
          Create Quiz
        </Button>
      </Box>
    </div>
  );
};

export default CreateQuiz;
