import { Box, Button, Typography } from "@mui/material";
import quizLogo from ".//..//..//Images/quiz-battle-home-pic.jpg";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useState } from "react";

const LiveBattleMain = () => {
  const { userData } = useContext(AppContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "fantasy",
          fontSize: "50px",
          color: "#394E6A",
        }}
      >
        Hello,&nbsp;
        <span style={{ color: "rgb(3,165,251)" }}>
          {userData?.firstName.charAt(0).toUpperCase() +
            userData?.firstName.slice(1).toLowerCase()}
        </span>
        .
      </Typography>
      <Typography
        sx={{
          fontFamily: "fantasy",
          fontSize: "50px",
          color: "#394E6A",
          marginBottom: "15px",
        }}
      >
        Welcome to the{" "}
        <span style={{ color: "rgb(3,165,251)" }}>Battle of Brains</span> !
      </Typography>
      <Box sx={{ display: "flex" }}>
        <img
          src={quizLogo}
          style={{
            height: "400px",
            width: "400px",
            borderRadius: "15px",
            marginRight: "15px",
          }}
          alt=""
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "fantasy",
              fontSize: "40px",
              color: "#394E6A",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            Challenge someone <br /> and <br />
            conquer the <span style={{ color: "rgb(3,165,251)" }}>Arena</span> !
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "125px",
              height: "40px",
              fontSize: "12px",
              backgroundColor: "rgb(3,165,251)",
              color: "white",
              marginTop: "30px",
            }}
          >
            Invite Rival
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LiveBattleMain;
