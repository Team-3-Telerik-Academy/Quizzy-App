import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import AnswerForm from "../AnswerForm/AnswerForm";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const WriteQuestionManually = ({ addQuestion, cancelQuestion }) => {
  const [open, setOpen] = useState(true);
  const [isAddAnswerButtonClicked, setIsAddAnswerButtonClicked] =
    useState(false);
  const [question, setQuestion] = useState({
    title: "",
    type: "",
    correctAnswer: "",
    answers: [],
    points: 1,
  });

  useEffect(() => {
    if (question.type === "boolean") {
      setQuestion({ ...question, answers: ["True", "False"] });
    } else if (question.type === "multiple") {
      setQuestion({ ...question, answers: [] });
    }
  }, [question.type]);

  const updateQuestion = (prop) => (e) => {
    setQuestion({
      ...question,
      [prop]: e.target.value,
    });
  };

  const addAnswer = (answer) => {
    if (!answer) {
      toast.error("The answer cannot be empty!");
      return;
    }

    if (question.answers.includes(answer)) {
      toast.error("The answer already exists!");
      return;
    }

    if (question.points < 1) {
      toast.error("The points cannot be less than 1!");
      return;
    }

    setQuestion({ ...question, answers: [...question.answers, answer] });
    setIsAddAnswerButtonClicked(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent style={{ padding: "30px" }}>
        <TextField
          style={{ marginBottom: "15px" }}
          fullWidth
          label="Question Title"
          value={question.title}
          onChange={updateQuestion("title")}
        />

        <FormControl fullWidth style={{ marginBottom: "15px" }}>
          <InputLabel>Type:</InputLabel>
          <Select value={question.type} onChange={updateQuestion("type")}>
            <MenuItem value="multiple">Multiple Choice</MenuItem>
            <MenuItem value="boolean">True / False</MenuItem>
          </Select>
        </FormControl>

        {question.type && question.type === "boolean" ? (
          <>
            <Typography variant="h6" color="primary" gutterBottom>
              Mark the correct answer:
            </Typography>
            <RadioGroup
              style={{ marginBottom: "15px" }}
              name="booleanQuestion"
              value={question.correctAnswer}
              onChange={updateQuestion("correctAnswer")}
            >
              <FormControlLabel value="True" control={<Radio />} label="True" />
              <FormControlLabel
                value="False"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </>
        ) : (
          question.type === "multiple" && (
            <>
              {isAddAnswerButtonClicked ? (
                <AnswerForm
                  addAnswer={addAnswer}
                  hideForm={() => setIsAddAnswerButtonClicked(false)}
                />
              ) : (
                <Button
                  style={{ marginBottom: "20px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => setIsAddAnswerButtonClicked(true)}
                >
                  Add Answer
                </Button>
              )}
              {question?.answers.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Mark the correct answer:
                  </Typography>
                  <RadioGroup
                  style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}
                    value={question.correctAnswer}
                    onChange={updateQuestion("correctAnswer")}
                  >
                    {question.answers.map((answer) => (
                      <FormControlLabel
                        key={answer}
                        value={answer}
                        control={<Radio />}
                        label={answer}
                        onChange={updateQuestion("correctAnswer")}
                      />
                    ))}
                  </RadioGroup>
                </div>
              )}
            </>
          )
        )}

        <TextField
          style={{ marginBottom: "15px" }}
          fullWidth
          type="number"
          label="Points"
          value={question.points}
          onChange={updateQuestion("points")}
        />

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => addQuestion(question)}
            style={{ marginRight: "10px" }}
          >
            Add Question
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              cancelQuestion();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

WriteQuestionManually.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  cancelQuestion: PropTypes.func.isRequired,
};

export default WriteQuestionManually;
