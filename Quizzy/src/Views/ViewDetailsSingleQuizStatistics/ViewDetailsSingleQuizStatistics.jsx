import { useLocation } from "react-router-dom";
import QuizzesComment from "../../Components/QuizzesComment/QuizzesComment";
import QuizResult from "../../Components/QuizResult/QuizResult";
import { useEffect, useState } from "react";

/**
 * Renders the details of a single quiz statistics.
 *
 * @component
 * @example
 * // Usage
 * return (
 *   <ViewDetailsSingleQuizStatistics />
 * )
 */
const ViewDetailsSingleQuizStatistics = () => {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);

  useEffect(() => {
    if (location.state) {
      setResult(location.state.result);
      setTotalPoints(location.state.totalPoints);
    }
  }, [location]);

  return (
    <>
      {result && (
        <QuizzesComment result={result} value={"educator"}>
          <QuizResult
            answers={result.answers}
            length={result.answers.filter((el) => el).length}
            score={result.score}
            correctAns={result.correctAns}
            timeTaken={result.timeTaken}
            quizTotalPoints={Number(totalPoints)}
            color={"white"}
            height={"100%"}
            margin={"0"}
          />
        </QuizzesComment>
      )}
    </>
  );
};

export default ViewDetailsSingleQuizStatistics;
