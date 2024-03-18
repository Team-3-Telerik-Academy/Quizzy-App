import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addQuestionToAQuiz,
  deleteQuiz,
  getQuizById,
  inviteUserToAQuiz,
  removeQuestionFromAQuiz,
  removeUserQuizInvitation,
  updateQuizInfo,
} from "../../services/quizzes.service";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import EditField from "../../Components/EditField/EditField";
import UploadImage from "../../Components/UploadImage/UploadImage";
import AppContext from "../../Context/AppContext";
import { getAllUsers } from "../../services/users.service";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import toast from "react-hot-toast";
import SingleQuestion from "../../Components/CreateQuizComponents/SingleQuestion/SingleQuestion";
import WriteQuestionManually from "../../Components/CreateQuizComponents/WriteQuestionManually/WriteQuestionManually";
import Loading from "../../Components/Loading/Loading";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3,165,251)",
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

const StyledCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "rgb(3,165,251)",
  },
});

const EditQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = useContext(AppContext);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [questionsPage, setQuestionsPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [quizInfo, setQuizInfo] = useState({
    title: "",
    category: "",
    difficulty: "",
    image: "",
    activeTimeInMinutes: "",
    timer: "",
    ongoingTill: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString("en-CA"),
  });

  const [editQuiz, setEditQuiz] = useState({
    title: false,
    category: false,
    difficulty: false,
    image: false,
    activeTimeInMinutes: false,
    timer: false,
    ongoingTill: false,
  });

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    getQuizById(id).then((quiz) => {
      setQuiz(quiz);
      setQuizInfo({
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        image: quiz.image,
        activeTimeInMinutes: quiz.activeTimeInMinutes,
        timer: quiz.timer,
      });
    }).catch(() => navigate("*"));
  }, []);

  useEffect(() => {
    if (quiz) {
      setQuestions(
        Object.keys(quiz.questions).map((questionKey) => {
          if (questionKey) {
            const question = quiz.questions[questionKey];
            return {
              ...question,
              id: questionKey,
            };
          }
        })
      );
    }
  }, [quiz]);

  // to be moved in another file
  const validateData = (prop) => {
    if (prop === "timer") {
      if (!quizInfo.timer) {
        toast.error("Timer cannot be empty!");
        return false;
      }

      if (isNaN(quizInfo.timer)) {
        toast.error("Timer must be a number!");
        return false;
      }

      if (parseInt(quizInfo.timer) < 0) {
        toast.error("Timer cannot be negative!");
        return false;
      }

      return true;
    }

    if (prop === "ongoingTill") {
      if (new Date(quizInfo.ongoingTill) < new Date()) {
        toast.error("Date must be in the future!");
        return false;
      }

      if (!quizInfo.ongoingTill) {
        toast.error("Date cannot be empty!");
        return false;
      }

      return true;
    }

    if (prop === "title") {
      if (quizInfo.title.length < 3 || quizInfo.title.length > 30) {
        toast.error("The quiz title must be between 3 and 30 characters!");
        return false;
      }

      return true;
    }
  };

  const handleQuestionsPageChange = (event, value) => {
    setQuestionsPage(value);
  };

  const removeQuestion = (question) => {
    removeQuestionFromAQuiz(quiz.id, question, setQuiz).then(() => {
      setQuestionsPage(1);
    });
  };

  const addQuestion = (question) => {
    addQuestionToAQuiz(quiz.id, question, setQuiz).then(() => {
      setQuestionsPage(1);
      setShowNewQuestionForm(false);
    });
  };

  return (
    <>
      {quiz ? (
        <Box style={{ margin: "55px 50px" }}>
          <Typography
            variant="h4"
            style={{ textAlign: "center", color: "rgb(3,165,251)" }}
          >
            Edit Quiz:
          </Typography>
          <br />
          <Box style={{ backgroundColor: "#F3F4F6", padding: "10px 30px" }}>
            <Box>
              <Box>
                <Box style={{ position: "relative" }}>
                  <Button
                    variant="contained"
                    style={{
                      position: "absolute",
                      right: "-1%",
                      top: "1%",
                      backgroundColor: "rgb(3, 165, 251)",
                      textTransform: "none",
                      borderRadius: "20px",
                      width: "150px",
                      height: "40px",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      deleteQuiz(id, userData.username);
                      navigate("/myQuizzes");
                    }}
                  >
                    Delete Quiz
                  </Button>
                  <Box>
                    {quiz && (
                      <UploadImage prop={quiz} fn={setQuiz} value="quizImage" />
                    )}
                  </Box>
                  <Divider />
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      style={{ margin: "15px 0", lineHeight: "30px" }}
                    >
                      <strong>Quiz Creator:</strong> <br /> {quiz?.author}
                    </Typography>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "rgb(3, 165, 251)",
                        height: "40px",
                      }}
                      onClick={() => navigate(`/profile/${quiz?.author}`)}
                    >
                      View Profile
                    </Button>
                  </Box>
                  <Divider />
                  <EditField
                    label="Quiz Title"
                    value={quizInfo.title}
                    isEditing={editQuiz.title}
                    onEdit={() => setEditQuiz({ ...editQuiz, title: true })}
                    onChange={(e) => {
                      setQuizInfo({
                        ...quizInfo,
                        title: e.target.value,
                      });
                    }}
                    onSave={() => {
                      if (validateData("title")) {
                        updateQuizInfo(id, "title", quizInfo.title, setQuiz);
                        setEditQuiz({ ...editQuiz, title: false });
                      }
                    }}
                  />
                  <Divider />
                  <Typography
                    variant="body1"
                    style={{ margin: "15px 0", lineHeight: "30px" }}
                  >
                    <strong>Category:</strong> <br /> {quiz?.category}
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body1"
                    style={{
                      margin: "15px 0",
                      lineHeight: "30px",
                      position: "relative",
                    }}
                  >
                    <strong>Type:</strong> <br /> {quiz?.type}
                    <Button
                      variant="contained"
                      style={{
                        position: "absolute",
                        right: "0",
                        bottom: "20%",
                        backgroundColor: "rgb(3, 165, 251)",
                      }}
                      onClick={() => {
                        updateQuizInfo(
                          id,
                          "type",
                          quiz.type === "public" ? "private" : "public",
                          setQuiz
                        );
                      }}
                    >
                      Change
                    </Button>
                  </Typography>
                  {quiz?.type === "private" && (
                    <ThemeProvider theme={theme}>
                      <Divider />
                      <Typography variant="body1" style={{ marginTop: "15px" }}>
                        <strong>Invite Users:</strong>
                      </Typography>
                      {users?.map((user) => (
                        <>
                          {user.username !== userData?.username &&
                            (!quiz?.invitedUsers ||
                              !Object.keys(quiz.invitedUsers).includes(
                                user.username
                              )) && (
                              <FormControlLabel
                                style={{ marginBottom: "10px" }}
                                key={user.username}
                                control={
                                  <Checkbox
                                    value={user.username}
                                    onChange={(e) => {
                                      e.target.checked &&
                                        inviteUserToAQuiz(
                                          id,
                                          quiz.title,
                                          user.username,
                                          userData.username,
                                          setQuiz
                                        );
                                    }}
                                  />
                                }
                                label={user.username}
                              />
                            )}
                        </>
                      ))}
                    </ThemeProvider>
                  )}
                  {quiz?.type === "private" && quiz?.invitedUsers && (
                    <>
                      <Divider />
                      <Typography
                        variant="body1"
                        style={{ margin: "15px 0", lineHeight: "30px" }}
                      >
                        <strong>Invited Users:</strong> <br />{" "}
                        {Object.keys(quiz.invitedUsers).map((user) => (
                          <FormControlLabel
                            style={{ marginBottom: "10px" }}
                            key={user}
                            control={
                              <StyledCheckbox
                                value={user}
                                checked={true}
                                onChange={(e) => {
                                  if (!e.target.checked) {
                                    removeUserQuizInvitation(
                                      id,
                                      quiz.title,
                                      user,
                                      setQuiz
                                    );
                                  }
                                }}
                              />
                            }
                            label={user}
                          />
                        ))}
                      </Typography>
                    </>
                  )}
                  <Divider />
                  <Typography
                    variant="body1"
                    style={{
                      margin: "15px 0",
                      lineHeight: "30px",
                      position: "relative",
                    }}
                  >
                    <strong>Difficulty:</strong> <br /> {quiz?.difficulty}
                    <Button
                      variant="contained"
                      style={{
                        position: "absolute",
                        right: "0",
                        bottom: "20%",
                        backgroundColor: "rgb(3, 165, 251)",
                      }}
                      onClick={() => {
                        updateQuizInfo(
                          id,
                          "difficulty",
                          quiz.difficulty === "easy"
                            ? "medium"
                            : quiz.difficulty === "medium"
                            ? "hard"
                            : "easy",
                          setQuiz
                        );
                      }}
                    >
                      Change
                    </Button>
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body1"
                    style={{
                      margin: "15px 0",
                      lineHeight: "30px",
                    }}
                  >
                    <strong>Active Till:</strong> <br />
                    {quiz?.ongoingTill &&
                      (editQuiz.ongoingTill ? (
                        <Box display="flex" justifyContent="space-between">
                          <StyledFormControl
                            style={{ margin: "5px 0", flex: 1 }}
                          >
                            <TextField
                              style={{ width: "30%" }}
                              type="date"
                              value={quizInfo.ongoingTill}
                              onChange={(e) =>
                                setQuizInfo({
                                  ...quizInfo,
                                  ongoingTill: e.target.value,
                                })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </StyledFormControl>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ height: "80%", marginTop: "15px" }}
                            onClick={() => {
                              if (validateData("ongoingTill")) {
                                updateQuizInfo(
                                  id,
                                  "ongoingTill",
                                  new Date(
                                    new Date(quizInfo.ongoingTill).setHours(
                                      0,
                                      0,
                                      0,
                                      0
                                    )
                                  ).toString(),
                                  setQuiz
                                );
                                setEditQuiz({
                                  ...editQuiz,
                                  ongoingTill: false,
                                });
                              }
                            }}
                          >
                            Done
                          </Button>
                        </Box>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {new Date(quiz.ongoingTill).toLocaleString(
                              "bg-BG",
                              {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "rgb(3, 165, 251)" }}
                            onClick={() =>
                              setEditQuiz({ ...editQuiz, ongoingTill: true })
                            }
                          >
                            Edit
                          </Button>
                        </div>
                      ))}
                  </Typography>
                  <Divider />
                  <EditField
                    label="Timer (in minutes)"
                    value={quizInfo.timer}
                    isEditing={editQuiz.timer}
                    onEdit={() => setEditQuiz({ ...editQuiz, timer: true })}
                    onChange={(e) => {
                      setQuizInfo({
                        ...quizInfo,
                        timer: e.target.value,
                      });
                    }}
                    onSave={() => {
                      if (validateData("timer")) {
                        updateQuizInfo(
                          id,
                          "timer",
                          quizInfo.timer || "0",
                          setQuiz
                        );
                        setEditQuiz({ ...editQuiz, timer: false });
                      }
                    }}
                  />
                  <Divider />
                  {showNewQuestionForm && (
                    <WriteQuestionManually
                      addQuestion={addQuestion}
                      cancelQuestion={() => setShowNewQuestionForm(false)}
                    />
                  )}
                  {questions && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{ margin: "15px 0" }}
                        >
                          <strong>Questions:</strong>
                        </Typography>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(3, 165, 251)",
                            height: "90%",
                          }}
                          onClick={() => setShowNewQuestionForm(true)}
                        >
                          Add New Question
                        </Button>
                      </div>
                      <SingleQuestion
                        key={[...questions].reverse()[questionsPage - 1].title}
                        question={[...questions].reverse()[questionsPage - 1]}
                        removeQuestion={() =>
                          removeQuestion(
                            [...questions].reverse()[questionsPage - 1]
                          )
                        }
                      />
                      <Pagination
                        count={questions.length}
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
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditQuiz;
