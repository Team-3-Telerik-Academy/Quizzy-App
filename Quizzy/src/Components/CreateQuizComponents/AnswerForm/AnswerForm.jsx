import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@mui/material";

/**
 * AnswerForm component for creating a new answer.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.addAnswer - The function to add an answer.
 * @param {Function} props.hideForm - The function to hide the form.
 * @returns {JSX.Element} The rendered AnswerForm component.
 */
const AnswerForm = ({ addAnswer, hideForm }) => {
  const [answer, setAnswer] = useState("");

  return (
    <>
        <TextField
          style={{ marginBottom: "15px" }}
          fullWidth
          name="answer"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          variant="outlined"
        />
      <Box display="flex" justifyContent="flex-end" marginBottom="15px">
        <Button
          style={{ marginRight: "10px", backgroundColor: "rgb(3, 165,251)", color: 'white' }}
          variant="contained"
          onClick={() => {
            addAnswer(answer);
            setAnswer("");
          }}
        >
          Add
        </Button>

        <Button variant="contained" color="secondary" onClick={hideForm}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

AnswerForm.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
};

export default AnswerForm;
