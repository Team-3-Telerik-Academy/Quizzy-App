import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  addCommentToATakenQuiz,
  editCommentToATakenQuiz,
  removeCommentToATakenQuiz,
} from "../../services/quizzes.service";
import AppContext from "../../Context/AppContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3,165,251)",
    },
  },
});

const QuizzesComment = () => {
  const [editedComment, setEditedComment] = useState("");
  //   const [editCommentView, setEditCommentView] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const { userData } = useContext(AppContext);
  const location = useLocation();
  const result = location.state.result;

  useEffect(() => {
    if (result) {
      setQuiz(result);
    }
  }, []);

  useEffect(() => {
    if (quiz) {
      if (quiz.comments) {
        const quizComments = Object.keys(quiz.comments).map((key) => {
          return {
            comment: quiz.comments[key],
            commentId: key,
          };
        });
        setComments(quizComments);
      }
    }
  }, [quiz]);

  const handleAddComment = () => {
    if (!comment) {
      toast.error("Comment cannot be empty!");
      return;
    }

    addCommentToATakenQuiz(
      result.participant,
      result.key,
      comment,
      setQuiz
    ).then(() => {
      toast.success("Comment added successfully!");
      setComment("");
    });
  };

  const handleEditComment = (commentId) => {
    editCommentToATakenQuiz(
      result.participant,
      result.key,
      commentId,
      editedComment,
      setQuiz
    ).then(() => {
      toast.success("Comment edited successfully!");
      setEditingCommentId(null);
    });
  };

  const handleRemoveComment = (commentId) => {
    removeCommentToATakenQuiz(
      result.participant,
      result.key,
      commentId,
      setQuiz
    ).then(() => {
      toast.success("Comment removed successfully!");
    });
  };

  return (
    <Container>
      <Box my={4}>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: "#394E6A",
            fontFamily: "Fantasy",
            textAlign: "center",
          }}
        >
          Comments:
        </Typography>
        <Box my={2}>
          <ThemeProvider theme={theme}>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              label="Comment"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
            />
          </ThemeProvider>
        </Box>
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "rgb(3, 165, 251)" }}
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        style={{ color: "#394E6A", fontFamily: "Fantasy" }}
      >
        Past Comments:
      </Typography>
      <Box>
        {comments &&
          comments.map((comment) => (
            <Box
              key={comment.commentId}
              my={2}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {editingCommentId === comment.commentId ? (
                <ThemeProvider theme={theme}>
                  <TextField
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    id="comment"
                    label="Comment"
                    multiline
                    rows={1}
                    variant="outlined"
                    color="primary"
                    style={{ width: "400px" }}
                  />
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button
                      style={{
                        backgroundColor: "rgb(3, 165, 251)",
                        border: "1px solid white",
                        color: "white",
                        height: "37px",
                      }}
                      variant="contained"
                      onClick={() => handleEditComment(comment.commentId)}
                    >
                      Done
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgb(3, 165, 251)",
                        border: "1px solid white",
                        color: "white",
                        height: "37px",
                      }}
                      variant="contained"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditedComment("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </ThemeProvider>
              ) : (
                <Typography
                  variant="body1"
                  style={{ color: "#394E6A", fontFamily: "Fantasy" }}
                >
                  {comment.comment}
                </Typography>
              )}
              {userData?.username !== result.participant &&
                editingCommentId !== comment.commentId && (
                  <div>
                    <Button
                      style={{
                        backgroundColor: "rgb(3, 165, 251)",
                        border: "1px solid white",
                      }}
                      variant="contained"
                      onClick={() => {
                        setEditingCommentId(comment.commentId);
                        setEditedComment(comment.comment);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgb(3, 165, 251)",
                        border: "1px solid white",
                      }}
                      variant="contained"
                      onClick={() => handleRemoveComment(comment.commentId)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default QuizzesComment;
