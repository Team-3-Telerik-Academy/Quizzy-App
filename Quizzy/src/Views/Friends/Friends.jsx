import { useState, useEffect } from "react";
import { createUserMessages, getAllUsers } from "../../services/users.service";
import { Box, Button, Typography } from "@mui/material";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { friendRequest } from "../../services/users.service";

const Friends = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { userData, chatUser, setChatUser, setUserData } =
    useContext(AppContext);
  const [text, setText] = useState({});

  useEffect(() => {
    users.map((user, index) => {
      if (index % 2 === 0) {
        setText((prevText) => ({ ...prevText, [index]: "Add friend" }));
      }
    });
  }, []);

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        return users.filter((user) => {
          return user.username !== userData.username;
        });
      })
      .then((result) => setUsers(result));
  }, []);

  const handleFriendRequest = async (sender, receiver, index) => {
    const result = await friendRequest(sender, receiver);
    setText((prevText) => ({ ...prevText, [index]: "Request sent" }));
    return result;
  };

  const handleMessage = async (user, sender, navigate, path) => {
    if (
      userData.messages &&
      Object.keys(userData.messages).includes(user.username)
    ) {
      setChatUser(user.username);
      navigate(path);
      return;
    }
    setChatUser(user.username);
    const result = await createUserMessages(user, sender, navigate, path);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          fontFamily: "fantasy",
          color: "#394E6A",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        You haven't made any friends yet,&nbsp;
        <span style={{ color: "rgb(3,165,251)" }}>
          {userData.firstName.charAt(0).toUpperCase() +
            userData.firstName.slice(1).toLowerCase()}
        </span>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            marginTop: "20px",
            fontFamily: "fantasy",
            color: "#394E6A",

            alignItems: "center",
          }}
        >
          Below you will see{" "}
          <span
            style={{
              color: "rgb(3,165,251)",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            people
          </span>{" "}
          you might know
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "10px",
            gap: "20px",
          }}
        >
          {users?.map((user, index) => {
            if (index % 2 === 0) {
              if (user.username === userData.username) {
                return;
              } else {
                return (
                  <Box
                    key={user.email}
                    sx={{ display: "flex", fontFamily: "inter,sans-serif" }}
                  >
                    <Box
                      sx={{
                        width: "300px",
                        height: "85px",
                        boxShadow: "4",
                        borderRadius: "15px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        transition: "transform 0.2s",
                        // cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <img
                        onClick={() => navigate(`/profile/${user.username}`)}
                        src={user.image}
                        style={{
                          width: "40px",
                          borderRadius: "20px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                        alt=""
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "14px",
                          marginLeft: "10px",
                        }}
                      >
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          {user.firstName}
                        </span>
                        <span>{user.lastName}</span>
                        <span>
                          Role:{" "}
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </span>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "14px",
                          marginLeft: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            width: "115px",
                            height: "auto",
                            fontSize: "9.8px",
                            marginBottom: "5px",
                            marginLeft: "10px",
                            backgroundColor: "rgb(3,165,251)",
                            color: "white",
                          }}
                          onClick={() =>
                            handleFriendRequest(userData, user, index)
                          }
                        >
                          {text[index] === "Request sent"
                            ? "Request sent"
                            : "Add Friend"}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              }
            }
          })}
        </Box>
      </Typography>
      {/* <Typography
        variant="h3"
        sx={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          fontFamily: "fantasy",
          color: "#394E6A",
        }}
      >
        All the users we have in our App,&nbsp;
        <span style={{ color: "rgb(3,165,251)" }}>
          {userData.firstName.charAt(0).toUpperCase() +
            userData.firstName.slice(1).toLowerCase()}
        </span>
      </Typography> */}
      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10px",
          gap: "20px",
        }}
      >
        {users?.map((user) => {
          return (
            <Box
              key={user.email}
              sx={{ display: "flex", fontFamily: "inter,sans-serif" }}
            >
              <Box
                sx={{
                  width: "300px",
                  height: "85px",
                  boxShadow: "4",
                  borderRadius: "15px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  transition: "transform 0.2s",
                  // cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  onClick={() => navigate(`/profile/${user.username}`)}
                  src={user.image}
                  style={{
                    width: "40px",
                    borderRadius: "20px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  alt=""
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "14px",
                    marginLeft: "10px",
                  }}
                >
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {user.firstName}
                  </span>
                  <span>{user.lastName}</span>
                  <span>
                    Role:{" "}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "14px",
                    marginLeft: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "115px",
                      height: "auto",
                      fontSize: "9.8px",
                      marginBottom: "5px",
                      marginLeft: "10px",
                      backgroundColor: "rgb(3,165,251)",
                      color: "white",
                    }}
                    onClick={() =>
                      handleMessage(user, userData, navigate, "/Messenger")
                    }
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box> */}
    </Box>
  );
};

export default Friends;
