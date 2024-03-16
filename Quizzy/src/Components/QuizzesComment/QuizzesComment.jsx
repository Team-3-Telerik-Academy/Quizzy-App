import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  addCommentToATakenQuiz,
  addReplyToACommentToATakenQuiz,
  deleteReplyFromACommentFromATakenQuiz,
  editCommentToATakenQuiz,
  editReplyInACommentInATakenQuiz,
  removeCommentToATakenQuiz,
} from "../../services/quizzes.service";
import AppContext from "../../Context/AppContext";
import PropTypes from "prop-types";
import ReplyToAComment from "../ReplyToAComment/ReplyToAComment";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3,165,251)",
    },
  },
});

const QuizzesComment = (props) => {
  const [editedComment, setEditedComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const { userData } = useContext(AppContext);

  const location = useLocation();
  const result = location.state?.result || props.result;

  let quizParticipant;
  let quizKey;

  if (props.value === "educator") {
    quizParticipant = result.participant;
    quizKey = result.key;
  } else if (props.value === "student") {
    quizParticipant = userData.username;
    quizKey = result.id;
  }

  useEffect(() => {
    if (result) {
      setQuiz(result);
    }
  }, []);

  useEffect(() => {
    if (quiz) {
      if (quiz.comments) {
        const quizComments = Object.keys(quiz.comments).map((commentKey) => {
          let replies = [];
          if (quiz.comments[commentKey].replies) {
            replies = Object.keys(quiz.comments[commentKey].replies).map(
              (replyKey) => {
                return {
                  reply: quiz.comments[commentKey].replies[replyKey].content,
                  replyId: replyKey,
                  author: quiz.comments[commentKey].replies[replyKey].author,
                };
              }
            );
          }

          return {
            author: quiz.comments[commentKey].author,
            comment: quiz.comments[commentKey].content,
            commentId: commentKey,
            replies: replies,
          };
        });
        setComments(quizComments);
      }
    }
  }, [quiz]);

  const handleAddReply = (commentId, reply, fn) => {
    if (!reply) {
      toast.error("Reply cannot be empty!");
      return;
    }

    addReplyToACommentToATakenQuiz(
      quizParticipant,
      quizKey,
      commentId,
      reply,
      userData.firstName + " " + userData.lastName,
      setQuiz
    ).then(() => {
      toast.success("Reply added successfully!");
      fn("");
    });
  };

  const handleDeleteReply = (commentId, replyId) => {
    deleteReplyFromACommentFromATakenQuiz(
      quizParticipant,
      quizKey,
      commentId,
      replyId,
      setQuiz
    ).then(() => {
      toast.success("Reply deleted successfully!");
    });
  };

  const handleEditReply = (commentId, replyId, editedReply) => {
    editReplyInACommentInATakenQuiz(
      quizParticipant,
      quizKey,
      commentId,
      replyId,
      editedReply,
      setQuiz
    ).then(() => {
      toast.success("Reply edited successfully!");
    });
  };

  const handleAddComment = () => {
    if (!comment) {
      toast.error("Comment cannot be empty!");
      return;
    }

    addCommentToATakenQuiz(
      result.participant,
      result.key,
      comment,
      userData.firstName + " " + userData.lastName,
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
        {props.children}
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
        {props.value === "educator" && (
          <>
            <Box my={2}>
              <ThemeProvider theme={theme}>
                <TextField
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  id="comment"
                  label="Comment"
                  multiline
                  rows={3}
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
          </>
        )}
      </Box>
      {props.value === "educator" && (
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: "#394E6A", fontFamily: "Fantasy" }}
        >
          Past Comments:
        </Typography>
      )}
      <Box style={{ marginBottom: "40px" }}>
        {comments &&
          comments.map((comment) => (
            <>
              <Typography
                style={{ color: "rgb(3,165,251)", fontWeight: "bold" }}
              >
                {comment.author}:
              </Typography>
              <Box
                key={comment.commentId}
                my={2}
                style={{
                  marginTop: "0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #394E6A",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 5px rgb(3,165,251)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
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
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                {editingCommentId !== comment.commentId &&
                  props.value === "educator" && (
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
              <ReplyToAComment
                comment={comment}
                theme={theme}
                handleAddReply={handleAddReply}
                handleDeleteReply={handleDeleteReply}
                handleEditReply={handleEditReply}
              />
            </>
          ))}
      </Box>
    </Container>
  );
};

QuizzesComment.propTypes = {
  result: PropTypes.object,
  children: PropTypes.node,
  value: PropTypes.string,
};

export default QuizzesComment;
