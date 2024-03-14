import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import createQuizSuccessBackground from "../../Images/sign-in-background.jpg";

const CreateSuccessView = () => {
  const navigate = useNavigate();
  const { value } = useParams();

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
        {value} Created Successfully!
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontSize: "20px" }}>
        What would you like to do next?
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          onClick={() =>
            navigate(value === "quiz" ? "/createQuiz" : "/createGroup")
          }
          style={{ marginRight: "20px", backgroundColor: "rgb(3, 165, 251)" }}
        >
          Create Another {value === "quiz" ? "Quiz" : "Group"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            navigate(value === "Quiz" ? "/myQuizzes" : "/myGroups")
          }
        >
          View All {value === "Quiz" ? "My Quizzes" : "My Groups"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateSuccessView;
