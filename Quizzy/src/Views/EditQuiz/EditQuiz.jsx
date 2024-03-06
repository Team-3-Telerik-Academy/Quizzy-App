import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/quizzes.service";

const EditQuiz = () => {
    const [quiz, setQuiz] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getQuizById(id).then(setQuiz);
    }, []);

    console.log(quiz);

    return (
      <div>
        <h1>Edit Quiz</h1>
      </div>
    );
}

export default EditQuiz;