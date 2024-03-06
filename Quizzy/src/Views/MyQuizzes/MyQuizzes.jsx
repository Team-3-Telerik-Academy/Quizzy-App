import Quizzes from "../../Components/Quizzes/Quizzes";
import { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { getQuizzesByAuthor } from "../../services/quizzes.service";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      getQuizzesByAuthor(userData.username).then(setQuizzes);
    }
  }, [userData]);

  return (
    <div
      style={{
        backgroundColor: "#F3F4F6",
        height: "100vh",
        marginTop: "40px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "rgb(3,165,251)", fontWeight: "bold", fontSize: "2em" }}>
          My Amazing Quizzes
        </h1>
      </div>
      {quizzes?.length > 0 ? (
        <Quizzes quizzes={quizzes} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2
            style={{ color: "rgb(3,165,251)", fontWeight: "bold", fontSize: "1.5em" }}
          >
            You haven&apos;t created any quizzes yet!
          </h2>
          <p style={{ fontSize: "1.2em" }}>
            Get started by clicking the{" "}
            <Button
              size="small"
              variant="contained"
              style={{ margin: "0 5px", backgroundColor: "rgb(3, 165, 251)" }}
              onClick={() => navigate("/createQuiz")}
            >
              Create Quiz
            </Button>{" "}
            button. <br /> Share your knowledge and challenge your friends or
            students with your own quizzes!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyQuizzes;
