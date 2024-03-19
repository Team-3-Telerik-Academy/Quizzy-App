import { Check, Close } from "@mui/icons-material";
import { IconButton, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { getQuizByTitle } from "../../services/quizzes.service";
import {
  acceptInvitation,
  declineInvitation,
  deleteNotification,
  getUserByUsername,
} from "../../services/users.service";
import AppContext from "../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getGroupByTitle } from "../../services/groups.services";
import { useLocation, useNavigate } from "react-router-dom";

const SingleNotification = ({
  invitation,
  value,
  handleNotificationsClose,
  setOpenedNotifications,
  id,
}) => {
  const { userData } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [takenQuiz, setTakenQuiz] = useState(null);

  useEffect(() => {
    if (value === "quizRepliesNotifications" && userData.role === "educator") {
      getUserByUsername(invitation.username).then((user) => {
        setTakenQuiz(user.val().takenQuizzes[invitation.quizId]);
      });
    }
  });

  const handleAcceptInvitation = () => {
    if (value === "quizInvitations") {
      getQuizByTitle(invitation)
        .then((quiz) => {
          acceptInvitation(
            userData.username,
            value,
            invitation,
            Object.keys(quiz.val())[0]
          );
        })
        .then(() => {
          toast.success("You have accepted the invitation successfully!", {
            position: "bottom-right",
          });
          setOpenedNotifications((prev) => prev - 1);
          if (location.pathname === "/quizzes") {
            navigate("/quizzes");
          }
        });
    }
    if (value === "groupInvitations") {
      getGroupByTitle(invitation)
        .then((group) => {
          acceptInvitation(
            userData.username,
            value,
            invitation,
            Object.keys(group.val())[0],
            userData.image
          );
        })
        .then(() => {
          toast.success("You have accepted the invitation successfully!", {
            position: "bottom-right",
          });
          setOpenedNotifications((prev) => prev - 1);
          if (location.pathname === "/educatorGroups") {
            navigate("/educatorGroups");
          }
        });
    }
    if (value === "friendRequests") {
      acceptInvitation(userData.username, value, invitation).then(() => {
        toast.success("You have accepted the invitation successfully!", {
          position: "bottom-right",
        });
        setOpenedNotifications((prev) => prev - 1);
        if (location.pathname === "/Friends") {
          navigate("/Friends");
        }
      });
    }
  };

  const handleDeclineInvitation = () => {
    if (value === "quizInvitations") {
      getQuizByTitle(invitation)
        .then((quiz) => {
          declineInvitation(
            userData.username,
            value,
            invitation,
            Object.keys(quiz.val())[0]
          );
        })
        .then(() => {
          toast.success("You have declined the invitation!", {
            position: "bottom-right",
          });
          setOpenedNotifications((prev) => prev - 1);
        });
    }
    if (value === "groupInvitations") {
      getGroupByTitle(invitation)
        .then((quiz) => {
          declineInvitation(
            userData.username,
            value,
            invitation,
            Object.keys(quiz.val())[0]
          );
        })
        .then(() => {
          toast.success("You have declined the invitation!", {
            position: "bottom-right",
          });
          setOpenedNotifications((prev) => prev - 1);
        });
    }
    if (value === "friendRequests") {
      declineInvitation(userData.username, value, invitation).then(() => {
        toast.success("You have declined the invitation!", {
          position: "bottom-right",
        });
        setOpenedNotifications((prev) => prev - 1);
      });
    }
    if (
      value === "quizCommentsNotifications" ||
      value === "quizRepliesNotifications"
    ) {
      deleteNotification(userData.username, value, id);
      setOpenedNotifications((prev) => prev - 1);
    }
  };

  return (
    <MenuItem
      onClick={handleNotificationsClose}
      style={{ color: "#333", fontSize: "14px" }}
    >
      {value === "quizInvitations" || value === "groupInvitations" ? (
        <>
          You have been invited from {userData[value][invitation]}{" "}
          {value === "quizInvitations"
            ? `to take the ${invitation} quiz`
            : value === "groupInvitations" && `to join the ${invitation} group`}
          <IconButton
            onClick={handleAcceptInvitation}
            style={{ color: "green", marginLeft: "10px" }}
          >
            <Check />
          </IconButton>
          <IconButton
            onClick={handleDeclineInvitation}
            style={{ color: "red", marginLeft: "10px" }}
          >
            <Close />
          </IconButton>
        </>
      ) : value === "friendRequests" ? (
        <>
          You have a new friend request from {userData[value][invitation]}
          <IconButton
            onClick={handleAcceptInvitation}
            style={{ color: "green", marginLeft: "10px" }}
          >
            <Check />
          </IconButton>
          <IconButton
            onClick={handleDeclineInvitation}
            style={{ color: "red", marginLeft: "10px" }}
          >
            <Close />
          </IconButton>
        </>
      ) : (
        <>
          <span
            onClick={() =>
              value === "quizCommentsNotifications" ||
              userData.role === "student"
                ? navigate("/takenQuizzes/details", {
                    state: {
                      quiz: {
                        ...userData.takenQuizzes[invitation],
                        id: invitation,
                      },
                    },
                  })
                : navigate("/singleQuizStatistics/viewDetails", {
                    state: {
                      result: {
                        ...takenQuiz,
                        key: invitation.quizId,
                        participant: invitation.username,
                      },
                      totalPoints: takenQuiz.totalPoints,
                    },
                  })
            }
          >
            You have a new{" "}
            {value === "quizRepliesNotifications" ? "reply" : "comment"} on a
            quiz. Check it out now!
          </span>
          <IconButton
            onClick={handleDeclineInvitation}
            style={{ color: "red", marginLeft: "10px" }}
          >
            <Close />
          </IconButton>
        </>
      )}
    </MenuItem>
  );
};

SingleNotification.propTypes = {
  invitation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.string,
  handleNotificationsClose: PropTypes.func,
  setOpenedNotifications: PropTypes.func,
  id: PropTypes.string,
};

export default SingleNotification;
