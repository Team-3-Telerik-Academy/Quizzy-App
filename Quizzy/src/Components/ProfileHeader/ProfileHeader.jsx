import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllUsersSortedByScore } from "../../services/users.service";

const HeaderBox = styled(Box)({
  borderBottom: "2px solid rgba(0, 0, 0, 0.25)",
  backgroundColor: "white",
  padding: "1.2em 2em",
  display: "flex",
  justifyContent: "space-between",
});

const ProfileHeader = ({ userData }) => {
  const [rank, setRank] = useState("unknown");

  useEffect(() => {
    getAllUsersSortedByScore().then((users) => {
      const user = users.find((user) => user.username === userData.username);
      if (user) {
        setRank(users.indexOf(user) + 1);
      }
    });
  }, []);

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
        {userData?.image && (
          <img
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            src={userData?.image}
            alt={userData?.username}
          />
        )}
        <Typography variant="h4">{userData?.username}</Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "20px",
          textAlign: "center",
        }}
      >
        {userData?.role === "educator" && (
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              borderRight: "2px solid rgba(0, 0, 0, 0.25)",
              paddingRight: "20px",
            }}
          >
            Created quizzes: <br />
            {userData?.createdQuizzes}
          </Typography>
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
          {userData?.takenQuizzes
            ? Object.keys(userData.takenQuizzes).length
            : 0}
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
          {new Date(userData?.createdOn).toLocaleString("bg-BG", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Typography>
        {userData?.isBlocked && (
          <Typography style={{ color: "red", fontWeight: "bold" }}>
            This profile is blocked!
          </Typography>
        )}
      </Box>
    </HeaderBox>
  );
};

ProfileHeader.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default ProfileHeader;
