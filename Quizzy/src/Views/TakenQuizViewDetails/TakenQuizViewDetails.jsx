import { useLocation } from "react-router-dom";
import QuizzesComment from "../../Components/QuizzesComment/QuizzesComment";
import ResultDetails from "../ResultDetails/ResultDetails";

const TakenQuizViewDetails = () => {
  const location = useLocation();
  const quiz = location.state?.quiz;

  return (
    <>
      {quiz && (
        <QuizzesComment result={quiz} value={'student'}>
          <ResultDetails answers={quiz.answers} height={'100%'} color={'white'} />
        </QuizzesComment>
      )}
    </>
  );
};

export default TakenQuizViewDetails;
