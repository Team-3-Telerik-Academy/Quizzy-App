import Quizzes from "../../Components/Quizzes/Quizzes";
import { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { getQuizzesByAuthor } from "../../services/quizzes.service";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (userData) {
      getQuizzesByAuthor(userData.username).then(setQuizzes);
    }
  }, [userData]);

  return (
    <div
      style={{ backgroundColor: "#F3F4F6", height: "100vh", margin: "40px 0" }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "darkblue", fontWeight: "bold", fontSize: "2em" }}>
          My Amazing Quizzes
        </h1>
      </div>
      {quizzes && <Quizzes quizzes={quizzes} />}
    </div>
  );
};

export default MyQuizzes;
