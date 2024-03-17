// Light Blue: #ADD8E6
// Sky Blue: #87CEEB
// Pale Yellow: #FFFFE0
// Light Pink: #FFB6C1

import { Box, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { getAllUsers } from "../../services/users.service";
import { getAllPrivateQuizzes } from "../../services/quizzes.service";
import { getAllPublicQuizzes } from "../../services/quizzes.service";
import AppContext from "../../Context/AppContext";
import GroupIcon from "@mui/icons-material/Group";
import publicQuizzesIcon from ".//..//..//Images/publicQuizzesIcon.svg";
import privateQuizzesIcon from ".//..//..//Images/privateQuizzesIcon.svg";
import blockedUsersIcon from ".//..//..//Images/blockedUsersIcon.svg";
import usersIcon from ".//..//..//Images/usersIcon.svg";
import studentsIcon from ".//..//..//Images/studentsIcon.svg";
import educatorsIcon from ".//..//..//Images/educatorIcon.svg";
import { useNavigate } from "react-router-dom/dist";

const AdminHome = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [educators, setEducators] = useState([]);
  const [students, setStudents] = useState([]);
  const [privateQuizzes, setPrivateQuizzes] = useState([]);
  const [publicQuizzes, setPublicQuizzes] = useState([]);
  const { userData } = useContext(AppContext);
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        return users.filter((user) => {
          return user.role === "student";
        });
      })
      .then((students) => setStudents(students));
  }, []);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        return users.filter((user) => {
          return user.isBlocked === true;
        });
      })
      .then((blockedUsers) => setBlockedUsers(blockedUsers));
  }, []);

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        return users.filter((user) => {
          return user.role === "educator";
        });
      })
      .then((educators) => setEducators(educators));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "fantasy",
          fontSize: "50px",
          marginTop: "50px",
          color: "#394E6A",
        }}
      >
        Hello,&nbsp;
        <span style={{ color: "rgb(3,165,251)" }}>
          {userData?.firstName.charAt(0).toUpperCase() +
            userData?.firstName.slice(1).toLowerCase()}
        </span>
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          marginTop: "60px",
          marginBottom: "25px",
          gap: "15px",
        }}
      >
        <Box
          sx={{
            width: "220px",
            height: "220px",
            borderRadius: "20px",
            backgroundColor: "#ADD8E6",
            display: "flex",
            justifyContent: "center",
            transition: "transform 0.2s",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/adminUsers");
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <img src={usersIcon} style={{ width: "70px" }} alt="" />
            <span
              style={{
                fontSize: "35px",
                color: "#394E6A",
                fontFamily: "fantasy",
                marginTop: "5px",
              }}
            >
              {users?.length}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#394E6A",
                fontFamily: "fantasy",
              }}
            >
              Users
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            width: "220px",
            height: "220px",
            borderRadius: "20px",
            backgroundColor: "#87CEEB",
            transition: "transform 0.2s",
            cursor: "pointer",
          }}
          onClick={() => navigate("/blockedUsers")}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <img src={blockedUsersIcon} style={{ width: "70px" }} alt="" />
            <span
              style={{
                fontSize: "35px",
                color: "#394E6A",
                fontFamily: "fantasy",
                marginTop: "5px",
              }}
            >
              {blockedUsers.length > 0 ? blockedUsers.length : 0}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#394E6A",
                fontFamily: "fantasy",
              }}
            >
              Blocked Users
            </span>
          </Box>
        </Box>
        <Box
          onClick={() => navigate("/adminQuizzes/public")}
          sx={{
            width: "220px",
            height: "220px",
            borderRadius: "20px",
            backgroundColor: "#FFFFE0",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <img
              src={publicQuizzesIcon}
              style={{ width: "70px", marginLeft: "9px" }}
              alt=""
            />
            <span
              style={{
                fontSize: "35px",
                color: "#394E6A",
                fontFamily: "fantasy",
                marginTop: "5px",
              }}
            >
              4
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#394E6A",
                fontFamily: "fantasy",
              }}
            >
              Public Quizzes
            </span>
          </Box>
        </Box>
        <Box
          onClick={() => navigate("/adminQuizzes/private")}
          sx={{
            width: "220px",
            height: "220px",
            borderRadius: "20px",
            backgroundColor: "#FFB6C1",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <img src={privateQuizzesIcon} style={{ width: "70px" }} alt="" />
            <span
              style={{
                fontSize: "35px",
                color: "#394E6A",
                fontFamily: "fantasy",
                marginTop: "5px",
              }}
            >
              2
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#394E6A",
                fontFamily: "fantasy",
              }}
            >
              Private Quizzes
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            width: "220px",
            height: "220px",
            borderRadius: "20px",
            backgroundColor: "#E6E6FA",
            display: "flex",
            justifyContent: "center",
            transition: "transform 0.2s",
            cursor: "pointer",
          }}
          onClick={() => navigate("/adminEducators")}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <img
              src={educatorsIcon}
              style={{ width: "70px", marginRight: "8px" }}
              alt=""
            />
            <span
              style={{
                fontSize: "35px",
                color: "#394E6A",
                fontFamily: "fantasy",
                marginTop: "5px",
              }}
            >
              {educators?.length}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#394E6A",
                fontFamily: "fantasy",
              }}
            >
              Educators
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            width: "220px",
            height: "220px",
            borderRadius: "20px",
            backgroundColor: "#98FF98",
            display: "flex",
            justifyContent: "center",
            transition: "transform 0.2s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={() => navigate("/adminStudents")}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <img src={studentsIcon} style={{ width: "70px" }} alt="" />
            <span
              style={{
                fontSize: "35px",
                color: "#394E6A",
                fontFamily: "fantasy",
                marginTop: "5px",
              }}
            >
              {students?.length}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#394E6A",
                fontFamily: "fantasy",
              }}
            >
              Students
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
