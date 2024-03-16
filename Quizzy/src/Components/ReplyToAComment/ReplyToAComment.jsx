import { Button, TextField, ThemeProvider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import deleteReply from "..//..//Images/delete-message.png";
import done from "..//..//Images/done.png";
import cancel from "..//..//Images/cancel.png";
import editReply from "..//..//Images/edit-message.png";

const buttonStyle = {
  backgroundColor: "rgb(3, 165, 251)",
  border: "1px solid white",
};

const ReplyToAComment = ({
  comment,
  theme,
  handleAddReply,
  handleDeleteReply,
  handleEditReply,
}) => {
  const [openReplyFormId, setOpenReplyFormId] = useState(null);
  const [reply, setReply] = useState("");
  const [editReplyId, setEditReplyId] = useState(null);
  const [editedReply, setEditedReply] = useState("");
  const { userData } = useContext(AppContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {comment?.replies?.length > 0 &&
        comment.replies.map((reply) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
                width: "100%",
                alignItems:
                  `${userData?.firstName} ${userData?.lastName}` ===
                  reply.author
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Typography
                  variant="body2"
                  style={{ color: "#394E6A", fontWeight: "bold" }}
                >
                  {reply.author}:
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems:
                      `${userData?.firstName} ${userData?.lastName}` ===
                      reply.author
                        ? "flex-end"
                        : "flex-start",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  {editReplyId !== reply.replyId && (
                    <Typography
                      variant="body2"
                      style={{ color: "#394E6A", fontFamily: "Fantasy" }}
                    >
                      {reply.reply}
                    </Typography>
                  )}
                  {`${userData?.firstName} ${userData?.lastName}` ===
                    reply.author && (
                    <>
                      {editReplyId === reply.replyId ? (
                        <>
                          <ThemeProvider theme={theme}>
                            <TextField
                              value={editedReply}
                              onChange={(e) => setEditedReply(e.target.value)}
                              id="edit-reply"
                              label="Edit Reply"
                              variant="outlined"
                              color="primary"
                              style={{
                                width: "400px",
                                backgroundColor: "#f0f0f0",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: "5px",
                                marginBottom: "3px",
                                gap: '2px'
                              }}
                            >
                              <img
                                src={done}
                                alt="Done"
                                style={{
                                  height: "22px",
                                  width: "22px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleEditReply(
                                    comment.commentId,
                                    reply.replyId,
                                    editedReply
                                  );
                                  setEditReplyId(null);
                                }}
                              />
                              <img
                                src={cancel}
                                alt="Cancel"
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  cursor: "pointer",
                                }}
                                onClick={() => setEditReplyId(null)}
                              />
                            </div>
                          </ThemeProvider>
                        </>
                      ) : (
                        <>
                          <img
                            src={editReply}
                            alt="Edit Reply"
                            style={{
                              height: "20px",
                              width: "20px",
                              cursor: "pointer",
                              marginLeft: "5px",
                            }}
                            onClick={() => {
                              setEditReplyId(reply.replyId);
                              setEditedReply(reply.reply);
                            }}
                          />
                          <img
                            src={deleteReply}
                            alt="Delete Reply"
                            style={{
                              height: "20px",
                              width: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleDeleteReply(
                                comment.commentId,
                                reply.replyId
                              )
                            }
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      {openReplyFormId === comment.commentId ? (
        <ThemeProvider theme={theme}>
          <TextField
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            id="reply"
            label="Reply"
            multiline
            rows={1}
            variant="outlined"
            color="primary"
            style={{ width: "400px" }}
          />
          <div style={{ display: "flex", gap: "1px", marginTop: "5px" }}>
            <Button
              style={{ ...buttonStyle, color: "white", height: "37px" }}
              variant="contained"
              onClick={() => {
                handleAddReply(comment.commentId, reply, setReply);
                setReply("");
                setOpenReplyFormId(null);
              }}
            >
              Submit Reply
            </Button>
            <Button
              style={{ ...buttonStyle, color: "white", height: "37px" }}
              variant="contained"
              onClick={() => {
                setReply("");
                setOpenReplyFormId(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </ThemeProvider>
      ) : (
        <Button
          style={buttonStyle}
          variant="contained"
          onClick={() => setOpenReplyFormId(comment.commentId)}
        >
          Add Reply
        </Button>
      )}
    </div>
  );
};

ReplyToAComment.propTypes = {
  comment: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleAddReply: PropTypes.func.isRequired,
  handleDeleteReply: PropTypes.func.isRequired,
  handleEditReply: PropTypes.func.isRequired,
};

export default ReplyToAComment;
