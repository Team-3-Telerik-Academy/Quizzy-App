import { useLocation } from "react-router-dom";
import QuizzesComment from "../../Components/QuizzesComment/QuizzesComment";
import ResultDetails from "../ResultDetails/ResultDetails";
import Loading from "../../Components/Loading/Loading";

const TakenQuizViewDetails = () => {
  const location = useLocation();
  const quiz = location.state?.quiz;

  return (
    <>
      {quiz?.comments ? (
        <QuizzesComment result={quiz} value={'student'}>
          <ResultDetails answers={quiz.answers} height={'100%'} color={'white'} />
        </QuizzesComment>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TakenQuizViewDetails;
