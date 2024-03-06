import { useContext, useEffect, useState } from "react";
import { getAllPublicQuizzes } from "../../services/quizzes.service";
import Quizzes from "../../Components/Quizzes/Quizzes";
import AppContext from "../../Context/AppContext";

const QuizzesView = () => {
  const [quizzes, setQuizzes] = useState(null);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (userData) {
      getAllPublicQuizzes().then((result) => {
        const ids = result.map((quiz) => quiz.id);
        setQuizzes(
          Object.keys(userData.takenQuizzes).filter(
            (quiz) => !ids.includes(quiz)
          )
        );
      });
    }
  }, [userData]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#F3F4F6",
          height: "100%",
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
          <h1
            style={{
              color: "rgb(3,165,251)",
              fontWeight: "bold",
              fontSize: "2em",
            }}
          >
            {/* Test Your Skills: Dive into Our Quizzes */}
            Challenge Yourself: Take a Quiz Today
          </h1>
        </div>
        {quizzes?.length > 0 ? (
          <Quizzes quizzes={quizzes} />
        ) : (
          <h1
            style={{ textAlign: "center", marginTop: "35vh", height: "28vh" }}
          >
            No quizzes available at the moment
          </h1>
        )}
      </div>
    </>
  );
};

export default QuizzesView;
