import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

const HeaderBox = styled(Box)({
  borderBottom: "2px solid rgba(0, 0, 0, 0.25)",
  backgroundColor: "white",
  padding: "1.2em 2em",
  display: "flex",
  justifyContent: "space-between",
});

const ProfileHeader = () => {
  const { userData } = useContext(AppContext);

  return (
    <HeaderBox>
      <Box>
        {userData?.image && (
          <img
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            src={userData?.image}
            alt={userData?.username}
          />
        )}
        <Typography variant="h4" marginLeft="17px">
          {userData?.username}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "20px",
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
          Created quizzes: <br />
          {userData?.createdQuizzes}
        </Typography>
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
          Rank / Scoreboard Place: <br /> {userData?.rank || 0}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          Joined on: <br />
          {new Date(userData?.createdOn).toLocaleString("bg-BG", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
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

export default ProfileHeader;
