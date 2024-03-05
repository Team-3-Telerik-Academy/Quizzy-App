import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { quizzesData } from "../PublicQuizzes/PublicQuizzes";
import { getQuizById } from "../../services/quizzes.service";
import toast from "react-hot-toast";
import TakeQuiz from "../../Components/TakeQuiz/TakeQuiz";
import QuizResult from "../../Components/QuizResult/QuizResult";

const PublicQuizView = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [questionaryView, setQuestionaryView] = useState(true);
  const [resultView, setResultView] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [questions, setQuestions] = useState([]);
  const [points, setPoits] = useState({});
  const [quiz, setQuiz] = useState({});
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const length = questions?.length;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [buttonColor, setButtonColor] = useState("rgb(3,165,251)");
  // reset this in Quiz Result
  const [correctAns, setCorrectAns] = useState({});
  const [timeTaken, setTimeTaken] = useState("");
  const [resultMinutes, setResultMinutes] = useState(0);
  const [resultSeconds, setResultSeconds] = useState(0);
  const [quizTotalPoints, setQuizTotalPoints] = useState(0);
  const [questionPoints, setQuestionPoints] = useState(0);

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
      setQuestionPoints(Number(data.questions[index].points));
    });
  }, []);

  const handleClick = (
    question,
    answer,
    page,

    questionPoint
  ) => {
    setSelectedItem({ ...selectedItem, [page]: question });
    setButtonColor("rgb(3,165,251)");

    if (question === answer) {
      setPoits({ ...points, [page]: questionPoint });
      setCorrectAns({ ...correctAns, [page]: 1 });
    } else {
      setPoits({ ...points, [page]: 0 });
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
      setQuestionaryView(false);
      setResultView(true);
      setScore(Object.values(points).reduce((acc, point) => acc + point));
      setTimeTaken(
        resultMinutes > 1
          ? `${resultMinutes} minutes  ${resultSeconds} seconds`
          : `${resultMinutes} minute  ${resultSeconds} seconds`
      );
      // setTimeTaken(`${resultMinutes} ${resultSeconds}`);
    }
  };

  return (
    <>
      {questionaryView && (
        <TakeQuiz
          minutes={minutes} //
          formattedSeconds={formattedSeconds} //
          buttonColor={buttonColor} //
          quiz={quiz} //
          setPoints={setPoits}
          index={index} //
          length={length} //
          questions={questions} //
          page={page} //
          setPage={setPage}
          selectedItem={selectedItem} //
          setSelectedItem={setSelectedItem}
          resultView={resultView}
          setResultView={setResultView}
          handleView={handleView} //
          handleChange={handleChange} //
          handleClick={handleClick} //
          resultMinutes={resultMinutes}
          resultSeconds={resultSeconds}
          setTimeTaken={setTimeTaken}
          quizTotalPoints={quizTotalPoints} //
          questionPoint={questionPoints} //
        />
      )}

      {resultView && (
        <QuizResult
          answers={answers}
          length={length}
          score={score}
          correctAns={correctAns}
          timeTaken={timeTaken}
          quizTotalPoints={quizTotalPoints}
        />
      )}
    </>
  );
};

export default PublicQuizView;
