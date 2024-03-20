import { useLocation } from "react-router-dom";
import QuizzesComment from "../../Components/QuizzesComment/QuizzesComment";
import ResultDetails from "../ResultDetails/ResultDetails";

/**
 * Renders the details of a taken quiz.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const TakenQuizViewDetails = () => {
  const location = useLocation();
  const quiz = location.state?.quiz;

  return (
    <>
      {quiz &&
        (quiz.type === "private" ? (
          <QuizzesComment result={quiz} value={"student"}>
            <ResultDetails
              answers={quiz.answers}
              height={"100%"}
              color={"white"}
            />
          </QuizzesComment>
        ) : (
          <ResultDetails
            answers={quiz.answers}
            height={"100%"}
            color={"white"}
          />
        ))}
    </>
  );
};

export default TakenQuizViewDetails;
