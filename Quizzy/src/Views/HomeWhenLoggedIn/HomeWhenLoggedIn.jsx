import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import home from "../../Images/test.jpg";
import quizHomePic from "../../Images/quiz-home-pic.jpeg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomeWhenLoggedIn = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          // color: "rgb(3, 165, 251)",
          color: "#394e6a",
          fontFamily: "Fantasy",
          marginBottom: "20px",
        }}
      >
        Welcome to <span style={{ color: "rgb(3, 165, 251)" }}>Quizzy</span>{" "}
        <br /> Are you ready to challenge yourself with our range of quizzes?
      </Typography>
      <img
        src={quizHomePic}
        alt="Cool Quiz"
        style={{
          width: "500px",
          height: "auto",
          marginBottom: "20px",
          borderRadius: "10px",

        }}
      />
      <Button
        onClick={() => navigate("/quizzes")}
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "rgb(3,165,251)",
          fontSize: "17px",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "rgb(3,165,251)",
          },
        }}
      >
        Start Quiz
      </Button>
    </Box>
  );
};

export default HomeWhenLoggedIn;
