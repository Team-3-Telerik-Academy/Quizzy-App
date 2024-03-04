import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import home from "../../Images/test.jpg";

const HomeWhenLoggedIn = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "rgb(3, 165, 251)",
          marginBottom: "20px",
        }}
      >
        Welcome to Quizzy! Ready to test your knowledge?
      </Typography>

      <img
        src={home}
        alt="Cool Quiz"
        style={{
          width: "400px",
          height: "auto",
          marginBottom: "20px",
          borderRadius: '10px'
        }}
      />
      <Button
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "black",
          fontSize: "17px",
          padding: "10px 20px",
        }}
      >
        Start Quiz
      </Button>
    </Box>
  );
};

export default HomeWhenLoggedIn;