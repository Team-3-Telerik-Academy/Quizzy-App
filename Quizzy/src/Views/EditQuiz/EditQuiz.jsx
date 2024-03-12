import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteQuiz,
  getQuizById,
  inviteUser,
  removeUser,
  updateQuizInfo,
} from "../../services/quizzes.service";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import EditField from "../../Components/EditField/EditField";
import UploadImage from "../../Components/UploadImage/UploadImage";
import AppContext from "../../Context/AppContext";
import { getAllUsers } from "../../services/users.service";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3,165,251)",
    },
  },
});

const numbers = Array.from({ length: 60 }, (_, i) => i + 1);

const timeUnits = [
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
];

const EditQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizInfo, setQuizInfo] = useState({
    title: "",
    category: "",
    difficulty: "",
    image: "",
    activeTimeInMinutes: "",
    timer: "",
  });

  const [editQuiz, setEditQuiz] = useState({
    title: false,
    category: false,
    difficulty: false,
    image: false,
    activeTimeInMinutes: false,
    timer: false,
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
    });
  }, []);

  return (
    <Box style={{ margin: "70px 50px" }}>
      <Typography
        variant="h4"
        style={{ textAlign: "center", color: "rgb(3,165,251)" }}
      >
        Edit Your Quiz:
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
                onClick={() => {deleteQuiz(id, userData.username); navigate("/myQuizzes")}}
              >
                Delete Quiz
              </Button>
              <Box>
                {quiz && (
                  <UploadImage prop={quiz} fn={setQuiz} value="quizImage" />
                )}
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
                  updateQuizInfo(id, "title", quizInfo.title, quizInfo);
                  setEditQuiz({ ...editQuiz, title: false });
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
                    <strong>Choose Users:</strong>
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
                                    inviteUser(id, user.username, setQuiz);
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
                          <Checkbox
                            value={user}
                            checked={true}
                            onChange={(e) => {
                              if (!e.target.checked) {
                                removeUser(id, user, setQuiz);
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
              <Typography variant="body1" style={{ margin: "15px 0" }}>
                <strong>Active Time For The Quiz:</strong>
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <FormControl
                  style={{ marginBottom: "15px", flex: 1, marginRight: "10px" }}
                >
                  <TextField
                    select
                    value={quizInfo.activeTimeInMinutes}
                    // onChange={updateQuiz("activeNumber")}
                  >
                    {numbers.map((number) => (
                      <MenuItem key={number} value={number}>
                        {number}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl
                  style={{ marginBottom: "15px", flex: 1, marginLeft: "10px" }}
                >
                  <TextField
                    select
                    value={quizInfo.activeTimeInMinutes}
                    // onChange={updateQuiz("activeTimeUnit")}
                  >
                    {timeUnits.map((unit) => (
                      <MenuItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Box>
              {/* <EditField
                label="Active Time In Minutes"
                value={quizInfo.activeTimeInMinutes}
                isEditing={editQuiz.activeTimeInMinutes}
                onEdit={() =>
                  setEditQuiz({ ...editQuiz, activeTimeInMinutes: true })
                }
                onChange={(e) => {
                  setQuizInfo({
                    ...quizInfo,
                    activeTimeInMinutes: e.target.value,
                  });
                }}
                // onSave={handlePhoneChange}
              /> */}
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
                  updateQuizInfo(id, "timer", quizInfo.timer, quizInfo);
                  setEditQuiz({ ...editQuiz, timer: false });
                }}
              />
              <Divider />
              {quiz?.questions && (
                <Typography variant="body1" style={{ margin: "15px 0" }}>
                  <strong>Questions:</strong>
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditQuiz;
