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
    });
  }, []);

  const handleClick = (question, value, answer, page) => {
    setSelectedItem({ ...selectedItem, [page]: question });
    setButtonColor("rgb(3,165,251)");

    if (value === answer) {
      setPoits({ ...points, [page]: 1 });
    } else {
      setPoits({ ...points, [page]: 0 });
    }

    if (value === answer) {
      setAnswers({ ...answers, [page]: value });
    } else {
      setAnswers({ ...answers, [page]: [value, answer] });
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
    }
  };

  return (
    <>
      {questionaryView && (
        <TakeQuiz
          minutes={minutes}
          formattedSeconds={formattedSeconds}
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
          quiz={quiz}
          setPoints={setPoits}
          index={index}
          length={length}
          questions={questions}
          page={page}
          setPage={setPage}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          resultView={resultView}
          setResultView={setResultView}
          handleView={handleView}
          handleChange={handleChange}
          handleClick={handleClick}
        />
      )}
      {resultView && (
        <QuizResult
          answers={answers}
          id={id}
          length={length}
          score={score}
          setQuestionaryView={setQuestionaryView}
          setResultView={setResultView}
          // setIndex={setIndex}
          // setPage={setPage}
          // setSelectedItem={setSelectedItem}
          // setQuestions={setQuestions}
          // setPoits={setPoits}
          // setQuiz={setQuiz}
          // setScore={setScore}
          // setAnswers={setAnswers}
          // setMinutes={setMinutes}
          // setSeconds={setSeconds}
          // setButtonColor={setButtonColor}
        />
      )}
    </>
  );
};

export default PublicQuizView;
