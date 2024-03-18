import { Box, Button, Typography } from "@mui/material";
import quizLogo from ".//..//..//Images/quiz-battle-home-pic.jpg";
import { useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { useState } from "react";
import { getAllUsers } from "../../services/users.service";
import UserProfilePic from "../../Components/UserProfilePic/UserProfilePic";

const LiveBattleMain = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userData } = useContext(AppContext);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  const handleOnlineUsersView = () => {
    if (showOnlineUsers) {
      setShowOnlineUsers(false);
    } else {
      setShowOnlineUsers(true);
    }
  };

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        return users.filter((user) => {
          return (
            user.status === "online" && user.username !== userData?.username
          );
        });
      })
      .then((usersOnline) => setOnlineUsers(usersOnline));
  }, []);

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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "100px",
        }}
      >
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
            // marginLeft:'60px'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "fantasy",
              fontSize: "40px",
              color: "#394E6A",
              //   marginTop: "30px",
              textAlign: "center",
            }}
          >
            Challenge someone <br /> and <br />
            conquer the <span style={{ color: "rgb(3,165,251)" }}>Arena</span> !
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "160px",
              height: "40px",
              fontSize: "12px",
              backgroundColor: "rgb(3,165,251)",
              color: "white",
              marginTop: "30px",
              marginBottom: "30px",
            }}
            onClick={handleOnlineUsersView}
          >
            {showOnlineUsers === false ? 'See who is online' : 'Hide online users'}
          </Button>
          {showOnlineUsers && (
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                {onlineUsers.map((user) => {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <UserProfilePic
                        image={user.image}
                        width={"48px"}
                        height={"48px"}
                      />
                      <span>{user.firstName}</span>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LiveBattleMain;
