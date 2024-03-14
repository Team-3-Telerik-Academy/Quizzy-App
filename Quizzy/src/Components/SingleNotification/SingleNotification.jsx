import { Check, Close } from "@mui/icons-material";
import { IconButton, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { getQuizByTitle } from "../../services/quizzes.service";
import {
  acceptInvitation,
  declineInvitation,
} from "../../services/users.service";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { getGroupByTitle } from "../../services/groups.services";

const SingleNotification = ({
  invitation,
  value,
  handleNotificationsClose,
}) => {
  const { userData, setUserData } = useContext(AppContext);

  const handleAcceptInvitation = (prop, value) => {
    //to write for friends
    if (prop === "quizInvitations") {
      getQuizByTitle(value)
        .then((quiz) => {
          acceptInvitation(
            userData.username,
            prop,
            value,
            Object.keys(quiz.val())[0],
            setUserData
          );
        })
        .then(() => {
          toast.success("You have accepted the invitation successfully!", {
            position: "bottom-right",
          });
        });
    }
    if (prop === "groupInvitations") {
      getGroupByTitle(value)
        .then((group) => {
          acceptInvitation(
            userData.username,
            prop,
            value,
            Object.keys(group.val())[0],
            setUserData
          );
        })
        .then(() => {
          toast.success("You have accepted the invitation successfully!", {
            position: "bottom-right",
          });
        });
    }
  };

  const handleDeclineInvitation = (prop, value) => {
    //to write for friends
    if (prop === "quizInvitations") {
      getQuizByTitle(value)
        .then((quiz) => {
          declineInvitation(
            userData.username,
            prop,
            value,
            Object.keys(quiz.val())[0],
            setUserData
          );
        })
        .then(() => {
          toast.success("You have declined the invitation!", {
            position: "bottom-right",
          });
        });
    } else if (prop === "groupInvitations") {
      getGroupByTitle(value)
        .then((quiz) => {
          declineInvitation(
            userData.username,
            prop,
            value,
            Object.keys(quiz.val())[0],
            setUserData
          );
        })
        .then(() => {
          toast.success("You have declined the invitation!", {
            position: "bottom-right",
          });
        });
    }
  };

  return (
    <MenuItem
      onClick={handleNotificationsClose}
      style={{ color: "#333", fontSize: "14px" }}
    >
      You have been invited from {userData[value][invitation]}{" "}
      {value === "quizInvitations"
        ? `to take the ${invitation} quiz`
        : value === "groupInvitations" && `to join the ${invitation} group`}
      <IconButton
        onClick={() => handleAcceptInvitation(value, invitation)}
        style={{ color: "green", marginLeft: "10px" }}
      >
        <Check />
      </IconButton>
      <IconButton
        onClick={() => handleDeclineInvitation(value, invitation)}
        style={{ color: "red", marginLeft: "10px" }}
      >
        <Close />
      </IconButton>
    </MenuItem>
  );
};

SingleNotification.propTypes = {
  invitation: PropTypes.string,
  value: PropTypes.string,
  handleNotificationsClose: PropTypes.func,
};

export default SingleNotification;
