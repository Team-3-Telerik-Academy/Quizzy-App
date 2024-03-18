import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/users.service";
import { Box, Button, Typography } from "@mui/material";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AdminStudents = () => {
  const [users, setUsers] = useState(null);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        return users.filter((user) => {
          return user.role === "student";
        });
      })
      .then((students) => setUsers(students));
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
            <span>
              {" "}
              All the <span style={{ color: "rgb(3,165,251)" }}>
                Students
              </span>{" "}
              in our system,{" "}
              {
                <span style={{ color: "rgb(3,165,251)" }}>
                  {userData.firstName.charAt(0).toUpperCase() +
                    userData.firstName.slice(1).toLowerCase()}
                </span>
              }
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
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src={user.image}
                      style={{
                        width: "40px",
                        borderRadius: "20px",
                        height: "40px",
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
                      <span style={{ color: "rgb(3,165,251)" }}>
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
                          height: "autopx",
                          fontSize: "10px",
                          marginLeft: "15px",
                          backgroundColor: "rgb(3,165,251)",
                          color: "white",
                        }}
                        onClick={() => navigate(`/profile/${user.username}`)}
                      >
                        View Profile
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

export default AdminStudents;
