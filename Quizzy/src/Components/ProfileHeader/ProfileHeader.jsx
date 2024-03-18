import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import {
  createUserMessages,
  getAllUsersSortedByScore,
} from "../../services/users.service";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import addUser from "..//..//Images/add-user.png";
import sendMessage from "..//..//Images/send-message.png";
import friends from "..//..//Images/friends.png";

const HeaderBox = styled(Box)({
  borderBottom: "2px solid rgba(0, 0, 0, 0.25)",
  backgroundColor: "white",
  padding: "1.2em 2em",
  display: "flex",
  justifyContent: "space-between",
});

const ProfileHeader = ({ user }) => {
  const [rank, setRank] = useState("unknown");
  const { userData, setChatUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsersSortedByScore().then((users) => {
      const user = users.find((user) => user.username === user.username);
      if (user) {
        setRank(users.indexOf(user) + 1);
      }
    });
  }, []);

  const handleSendMessage = async () => {
    if (user.messages && Object.keys(user.messages).includes(user.username)) {
      setChatUser(user.username);
      navigate("/Messenger");
      return;
    }
    setChatUser(user.username);
    await createUserMessages(user, userData, navigate, "/Messenger");
  };

  return (
    <HeaderBox>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "15px",
        }}
      >
        {user?.image && (
          <img
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            src={user?.image}
            alt={user?.username}
          />
        )}
        <Typography variant="h4">
          {user?.username} <br />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            {user.username !== userData.username && (
              <>
                {/* <img
              src={friends}
              alt="friends"
              style={{ height: "20px", width: "20px" }}
            /> */}
                <img
                  // onClick={handleSendRequest}
                  src={addUser}
                  alt="send friend request"
                  style={{ height: "20px", width: "20px", cursor: "pointer" }}
                />
                <img
                  onClick={handleSendMessage}
                  src={sendMessage}
                  alt="send message"
                  style={{ height: "28px", width: "28px", cursor: "pointer" }}
                />
              </>
            )}
          </span>
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            borderRight: "2px solid rgba(0, 0, 0, 0.25)",
            paddingRight: "20px",
          }}
        >
          Role: <br />
          {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
        </Typography>
        {user?.role === "educator" && (
          <>
            <Typography
              variant="body1"
              style={{
                fontWeight: "bold",
                borderRight: "2px solid rgba(0, 0, 0, 0.25)",
                paddingRight: "20px",
              }}
            >
              Groups: <br />
              {user?.groups || 0}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "bold",
                borderRight: "2px solid rgba(0, 0, 0, 0.25)",
                paddingRight: "20px",
              }}
            >
              Created quizzes: <br />
              {user?.createdQuizzes}
            </Typography>
          </>
        )}
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            borderRight: "2px solid rgba(0, 0, 0, 0.25)",
            paddingRight: "20px",
          }}
        >
          Taken quizzes: <br />{" "}
          {user?.takenQuizzes ? Object.keys(user.takenQuizzes).length : 0}
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            borderRight: "2px solid rgba(0, 0, 0, 0.25)",
            paddingRight: "20px",
          }}
        >
          Scoreboard Place: <br /> {rank}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          Joined on: <br />
          {new Date(user?.createdOn).toLocaleString("bg-BG", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Typography>
        {user?.isBlocked && (
          <Typography style={{ color: "red", fontWeight: "bold" }}>
            This profile is blocked!
          </Typography>
        )}
      </Box>
    </HeaderBox>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileHeader;
