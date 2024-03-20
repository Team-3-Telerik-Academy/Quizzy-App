import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/users.service";
import { Box, Button, Typography } from "@mui/material";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import { unblockUser } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import UserProfilePic from "../../Components/UserProfilePic/UserProfilePic";

/**
 * Represents the BlockedUsers component.
 * This component displays a list of blocked users and provides an option to unblock them.
 *
 * @component
 * @example
 * return (
 *   <BlockedUsers />
 * )
 */
const BlockedUsers = () => {
  const [users, setUsers] = useState(null);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleUnblock = async (username, fn, user) => {
    const result = await unblockUser(username, fn, user);
    return result;
  };

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        return users.filter((user) => {
          return user.isBlocked === true;
        });
      })
      .then((blockedUsers) => setUsers(blockedUsers));
  }, []);

  return (
    <>
      {users && (
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
            {users?.length === 0 && (
              <span style={{ textAlign: "center" }}>
                The Quizzy app still does not have users <br></br> with bad
                attitude,{" "}
                {
                  <span style={{ color: "rgb(3,165,251)" }}>
                    {userData.firstName.charAt(0).toUpperCase() +
                      userData.firstName.slice(1).toLowerCase()}
                  </span>
                }
              </span>
            )}
            {users?.length > 0 && (
              <span>
                {" "}
                All the users with bad attitude,{" "}
                {
                  <span style={{ color: "rgb(3,165,251)" }}>
                    {userData.firstName.charAt(0).toUpperCase() +
                      userData.firstName.slice(1).toLowerCase()}
                  </span>
                }
              </span>
            )}
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
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <UserProfilePic
                      image={user.image}
                      status={user.status}
                      onClick={() => navigate(`/profile/${user.username}`)}
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
                      <span>Role: {user.role}</span>
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
                          width: "107px",
                          height: "autopx",
                          fontSize: "10px",
                          marginLeft: "15px",
                          backgroundColor: "rgb(3,165,251)",
                          color: "white",
                        }}
                        onClick={() =>
                          handleUnblock(user.username, setUsers, user)
                        }
                      >
                        Unblock
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

export default BlockedUsers;
