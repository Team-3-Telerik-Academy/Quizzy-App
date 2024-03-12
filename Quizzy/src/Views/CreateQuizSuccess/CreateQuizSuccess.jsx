import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import createQuizSuccessBackground from "../../Images/sign-in-background.jpg";

const CreateQuizSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "96.6vh",
        backgroundImage: `url(${createQuizSuccessBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{
          color: "rgb(3, 165, 251)",
          fontStyle: "bold",
          fontSize: "40px",
        }}
      >
        Quiz Created Successfully!
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontSize: "20px" }}>
        What would you like to do next?
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          onClick={() => navigate("/createQuiz")}
          style={{ marginRight: "20px", backgroundColor: "rgb(3, 165, 251)" }}
        >
          Create Another Quiz
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/myQuizzes")}
        >
          View All My Quizzes
        </Button>
      </Box>
    </Box>
  );
};

export default CreateQuizSuccess;
