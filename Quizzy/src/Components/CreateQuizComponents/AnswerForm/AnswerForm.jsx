import { useState } from "react";
import PropTypes from 'prop-types';

const AnswerForm = ({addAnswer, hideForm}) => {
    const [answer, setAnswer] = useState('');

    return (<>
    <input type="text" name="answer" id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
    <button onClick={() => {addAnswer(answer); setAnswer('')}}>Add</button>
    <button onClick={hideForm}>Cancel</button>
    </>)
}

AnswerForm.propTypes = {
    addAnswer: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
}

export default AnswerForm;