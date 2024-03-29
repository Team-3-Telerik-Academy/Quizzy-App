import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/users.service";
import { Box, Button, Typography } from "@mui/material";
import { handleAdmin, handleBlock } from "../../services/users.service";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserProfilePic from "../../Components/UserProfilePic/UserProfilePic";

/**
 * Renders the AdminUsers component.
 *
 * @returns {JSX.Element} The rendered AdminUsers component.
 */
const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  const { userData } = useContext(AppContext);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  const handleAdminStatus = async (username, fn, user) => {
    const changeAdminStatus = await handleAdmin(username, fn, user);
    return changeAdminStatus;
  };

  const handleBlockStatus = async (username, fn, user) => {
    const changeBlockStatus = await handleBlock(username, fn, user);
    return changeBlockStatus;
  };

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
            All the users we have in our App,&nbsp;
            <span style={{ color: "rgb(3,165,251)" }}>
              {userData.firstName.charAt(0).toUpperCase() +
                userData.firstName.slice(1).toLowerCase()}
            </span>
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
                          width: "107px",
                          height: "auto",
                          fontSize: "10px",
                          marginBottom: "5px",
                          marginLeft: "15px",
                          backgroundColor: "rgb(3,165,251)",
                          color: "white",
                        }}
                        onClick={() =>
                          handleAdminStatus(user.username, setUsers, user)
                        }
                      >
                        {user.isAdmin ? "Admin" : "Not Admin"}
                      </Button>
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
                          handleBlockStatus(user.username, setUsers, user)
                        }
                      >
                        {user.isBlocked ? "Blocked" : "Not Blocked"}
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

export default AdminUsers;
