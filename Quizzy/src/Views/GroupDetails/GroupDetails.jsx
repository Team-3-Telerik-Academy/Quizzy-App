import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGroupById } from "../../services/groups.services";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogContent,
  DialogActions,
  AvatarGroup,
  Tooltip,
} from "@mui/material";
import AppContext from "../../Context/AppContext";
import { getQuizzesByGroupId } from "../../services/quizzes.service";
import QuizCarousel from "../../Components/QuizCarousel/QuizCarousel";
import Quizzes from "../../Components/Quizzes/Quizzes";
import { styled } from "@mui/system";
import UserProfilePic from "../../Components/UserProfilePic/UserProfilePic";

const StyledButton = styled(Button)({
  color: "#fff",
  padding: "10px",
  borderRadius: "0px",
  "&:active": {
    backgroundColor: "black",
  },
  "&:focus": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

const GroupDetails = () => {
  const [group, setGroup] = useState(null);
  const [open, setOpen] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState(null);
  const [ongoingQuizzes, setOngoingQuizzes] = useState(null);
  const [finishedQuizzes, setFinishedQuizzes] = useState(null);
  const [updateQuizzes, setUpdateQuizzes] = useState(false);
  const [view, setView] = useState(
    localStorage.getItem("myQuizzesView") || "carousel"
  );
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("myQuizzesPage")) || 1
  );
  const { groupId } = useParams();
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("myQuizzesPage", page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem("myQuizzesView", view);
  }, [view]);

  useEffect(() => {
    getGroupById(groupId)
      .then((result) => {
        setGroup(result);
        const notAccepted = Object.keys(result.invitedUsers).filter(
          (user) => result.invitedUsers[user] !== "accepted"
        );
        setInvitedUsers(
          notAccepted.map((user) => ({
            user: user,
            status: result.invitedUsers[user],
          }))
        );
      })
      .then(() =>
        getQuizzesByGroupId(groupId).then((result) => {
          setOngoingQuizzes(result.filter((quiz) => quiz.status === "Ongoing"));
          setFinishedQuizzes(
            result.filter((quiz) => quiz.status === "Finished")
          );
        })
      )
      .catch(() => navigate("*"));
  }, [updateQuizzes]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {group && (
        <Box
          sx={{
            color: "black",
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "60px",
            height: "100%",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Typography
              variant="h4"
              style={{
                marginBottom: "20px",
                color: "#394E6A",
                fontFamily: "Fantasy",
                marginLeft: "3px",
              }}
            >
              {group.title}
            </Typography>
            <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography variant="h6">Members:</Typography>
              <AvatarGroup total={Object.keys(group.members).length}>
                {Object.keys(group.members).map((name) => (
                  <Tooltip title={name} key={name} placement="bottom-end">
                    <Link
                      to={`/profile/${name}`}
                      style={{ textDecoration: "none" }}
                    >
                      <UserProfilePic
                        image={group.members[name]}
                        status={group.membersStatus[name]}
                      />
                    </Link>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
          </Box>
          <Card sx={{ width: "90%" }}>
            <CardMedia
              component="img"
              height="140"
              image={group.image}
              alt={group.title}
            />
            <CardContent
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Created on:{" "}
                  {new Date(group.createdOn).toLocaleString("bg-BG", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Creator: {group.createdBy}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.primary"
                  style={{ margin: "10px 0" }}
                >
                  <strong style={{ color: "#394E6A" }}>Description:</strong>{" "}
                  {group.description}
                </Typography>
              </Box>
              <Box>
                {group.createdBy === userData.username && (
                  <Box
                    sx={{ mt: 2 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                      marginTop: "0",
                    }}
                  >
                    <Typography variant="body2">
                      <strong style={{ color: "#394E6A" }}>
                        Number of Invitations:
                      </strong>{" "}
                      {invitedUsers.length}
                    </Typography>
                    <Button
                      variant="outlined"
                      style={{ color: "rgb(3,165,251)" }}
                      onClick={handleClickOpen}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "rgb(3,165,251)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "")
                      }
                    >
                      See Invitations
                    </Button>
                    <Dialog open={open} onClose={handleClose} fullWidth>
                      <DialogContent
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Table style={{ margin: "auto" }}>
                          <TableBody>
                            {invitedUsers.map((user) => (
                              <TableRow key={user.user}>
                                <TableCell component="th" scope="row">
                                  {user.user}
                                </TableCell>
                                <TableCell align="right">
                                  {user.status}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          style={{ color: "rgb(3,165,251)" }}
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              textAlign: "center",
              marginTop: "20px",
              gap: "5px",
              width: "90%",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Typography
                variant="h5"
                color="#394E6A"
                style={{ fontFamily: "Fantasy" }}
              >
                Quizzes in the group
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: "rgb(3,165,251)" }}
                onClick={() =>
                  navigate("/createQuiz", {
                    state: { from: group.id },
                  })
                }
              >
                Add New Quiz To The Group
              </Button>
            </Box>
            {ongoingQuizzes?.length > 0 || finishedQuizzes?.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "rgb(3,165,251)",
                    gap: "50px",
                  }}
                >
                  <StyledButton
                    style={{
                      backgroundColor: page === 1 && "rgba(255, 255, 255, 0.3)",
                    }}
                    onClick={() => setPage(1)}
                  >
                    Ongoing Quizzes
                  </StyledButton>
                  <StyledButton
                    style={{
                      backgroundColor: page === 2 && "rgba(255, 255, 255, 0.3)",
                    }}
                    onClick={() => setPage(2)}
                  >
                    Finished Quizzes
                  </StyledButton>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <select
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    style={{
                      backgroundColor: "white",
                      color: "rgb(3,165,251)",
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid rgb(3,165,251)",
                    }}
                  >
                    <option value="carousel">Slide Show</option>
                    <option value="pages">Full View</option>
                  </select>
                </div>
                {page === 1 && ongoingQuizzes.length === 0 ? (
                  <h2
                    style={{
                      alignItems: "center",
                      fontSize: "23px",
                      display: "flex",
                      justifyContent: "center",
                      height: "55%",
                    }}
                  >
                    There is no any active quizzes in the group!
                  </h2>
                ) : (
                  page === 1 &&
                  ongoingQuizzes.length > 0 && (
                    <>
                      {view === "carousel" ? (
                        <QuizCarousel
                          quizzes={ongoingQuizzes}
                          value="author"
                          fn={setUpdateQuizzes}
                          width="auto"
                        />
                      ) : (
                        <Quizzes
                          quizzes={ongoingQuizzes}
                          value="author"
                          fn={setUpdateQuizzes}
                        />
                      )}
                    </>
                  )
                )}
                {page === 2 && finishedQuizzes.length === 0 ? (
                  <h2
                    style={{
                      alignItems: "center",
                      fontSize: "23px",
                      display: "flex",
                      justifyContent: "center",
                      height: "55%",
                    }}
                  >
                    There is no any finished quizzes in the group!
                  </h2>
                ) : (
                  page === 2 &&
                  finishedQuizzes.length > 0 && (
                    <>
                      {view === "carousel" ? (
                        <QuizCarousel
                          quizzes={finishedQuizzes}
                          value="author"
                        />
                      ) : (
                        <Quizzes quizzes={finishedQuizzes} value="author" />
                      )}
                    </>
                  )
                )}
              </>
            ) : (
              <h2
                style={{
                  alignItems: "center",
                  fontSize: "23px",
                  display: "flex",
                  justifyContent: "center",
                  height: "55%",
                }}
              >
                There is no quizzes in the group yet!
              </h2>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default GroupDetails;
