import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../services/quizzes.service";
import toast from "react-hot-toast";
import TakeQuiz from "../../Components/TakeQuiz/TakeQuiz";
import { db } from "../../config/firebase-config";
import { get, push, ref, update } from "firebase/database";
import AppContext from "../../Context/AppContext";
import LoggedInMain from "../../Components/LoggedInMain/LoggedInMain";
import { updateUserInfo } from "../../services/users.service";

/**
 * Renders the public quiz view component.
 *
 * @component
 * @returns {JSX.Element} The public quiz view component.
 */
const PublicQuizView = () => {
  const { userData } = useContext(AppContext);
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [resultView, setResultView] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState({});
  const [quiz, setQuiz] = useState({});
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const length = questions?.length;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [buttonColor, setButtonColor] = useState("rgb(3,165,251)");
  const [correctAns, setCorrectAns] = useState({});
  const [timeTaken, setTimeTaken] = useState("");
  const [resultMinutes, setResultMinutes] = useState(0);
  const [resultSeconds, setResultSeconds] = useState(0);
  const [quizTotalPoints, setQuizTotalPoints] = useState(0);
  const [questionPoints, setQuestionPoints] = useState(0);
  const [sentToDb, setSentToDb] = useState(false);
  const navigate = useNavigate();
  const [quizExists, setQuizExists] = useState(false);

  useEffect(() => {
    getQuizById(id).then((data) => {
      if (!data) {
        setQuizExists(false);
      } else {
        setQuizExists(true);
      }
    });
  }, [id]);

  useEffect(() => {
    if (resultView) {
      navigate("/quizResult", {
        replace: true,
        state: {
          answers: answers,
          length: length,
          score: score,
          correctAns: correctAns,
          timeTaken: timeTaken,
          quizTotalPoints: quizTotalPoints,
        },
      });
    }
  }, [score]);

  useEffect(() => {
    if (resultView && userData && !sentToDb) {
      get(ref(db, `users/${userData.username}/totalPoints`))
        .then((totalPoints) => {
          updateUserInfo(
            userData.username,
            "totalPoints",
            totalPoints.val() + score,
          );
        })
        .then(() => {
          push(ref(db, `users/${userData.username}/takenQuizzes`), {
            id,
            quizTitle: quiz.title,
            score,
            correctAns,
            timeTaken,
            answers,
            takenOn: new Date().toString(),
            type: quiz.type,
            totalPoints: quizTotalPoints,
          });
        })
        .then(() =>
          update(ref(db, `quizzes/${id}/takenBy`), {
            [userData.username]: true,
          })
        )
        .then(() => setSentToDb(true));
    }
  }, [resultView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResultSeconds((prev) => {
        if (prev < 60) {
          return prev + 1;
        } else {
          setResultMinutes((prev) => prev + 1);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedSeconds = String(seconds).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          setMinutes((prevMin) => {
            if (prevMin > 0) {
              return prevMin - 1;
            } else {
              return prevMin;
            }
          });
          return 59;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getQuizById(id).then((data) => {
      setQuiz(data);
      setQuestions(Object.values(data.questions));
      setMinutes(Number(data.timer));
      setQuizTotalPoints(Number(data.totalPoints));
      setQuestionPoints(
        Object.values(data.questions).map((question) => Number(question.points))
      );
    });
  }, []);

  const handleClick = (question, answer, page, questionPoint) => {
    setSelectedItem({ ...selectedItem, [page]: question });
    setButtonColor("rgb(3,165,251)");

    if (question === answer) {
      setPoints({ ...points, [page]: questionPoint });
      setCorrectAns({ ...correctAns, [page]: 1 });
    } else {
      setPoints({ ...points, [page]: 0 });
    }

    if (question === answer) {
      setAnswers({ ...answers, [page]: question });
    } else {
      setAnswers({ ...answers, [page]: [question, answer] });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
    setIndex(value - 1);
  };

  const handleView = () => {
    if (Object.values(points).length < length) {
      toast.error("Make sure you have answered all of the questions!", {
        position: "bottom-right",
      });
      setButtonColor("red");
      setTimeout(() => {
        setButtonColor("rgb(3,165,251)");
      }, 270);
    } else {
      setScore(Object.values(points).reduce((acc, point) => acc + point));
      setTimeTaken(
        resultMinutes > 1
          ? `${resultMinutes} minutes  ${resultSeconds} seconds`
          : `${resultMinutes} minute  ${resultSeconds} seconds`
      );
      setResultView(true);
    }
  };

  return (
    <>
      {userData && (
        <LoggedInMain>
          <br />
          <br />
        </LoggedInMain>
      )}
      {quizExists ? (<TakeQuiz
        minutes={minutes}
        formattedSeconds={formattedSeconds}
        buttonColor={buttonColor}
        quiz={quiz}
        index={index}
        length={length}
        questions={questions}
        page={page}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setResultView={setResultView}
        handleView={handleView}
        handleChange={handleChange}
        handleClick={handleClick}
        quizTotalPoints={quizTotalPoints}
        questionPoint={questionPoints[index]}
      />) : (navigate("*"))}
    </>
  );
};

export default PublicQuizView;
