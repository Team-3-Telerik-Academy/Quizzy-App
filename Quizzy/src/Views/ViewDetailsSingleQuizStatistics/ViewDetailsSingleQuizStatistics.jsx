import { useLocation } from "react-router-dom";
import QuizzesComment from "../../Components/QuizzesComment/QuizzesComment";
import QuizResult from "../../Components/QuizResult/QuizResult";
import Loading from "../../Components/Loading/Loading";

const ViewDetailsSingleQuizStatistics = () => {
  const location = useLocation();
  const { result, totalPoints } = location.state;

  return (
    <>
      {result?.score ? (
        <QuizzesComment result={result} value={'educator'}>
        <QuizResult
        answers={result.answers}
        length={result.answers.filter((el) => el).length}
        score={result.score}
        correctAns={result.correctAns}
        timeTaken={result.timeTaken}
        quizTotalPoints={Number(totalPoints)}
        color={'white'}
        height={'100%'}
        margin={'0'}
      />
        </QuizzesComment>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ViewDetailsSingleQuizStatistics;