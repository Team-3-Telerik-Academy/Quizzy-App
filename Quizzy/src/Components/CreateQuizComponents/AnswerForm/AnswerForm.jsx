import { useState } from "react";
import PropTypes from 'prop-types';
import { Box, Button, TextField } from "@mui/material";

const AnswerForm = ({addAnswer, hideForm}) => {
    const [answer, setAnswer] = useState('');

    return (
        <>
          <TextField
          style={{ marginBottom: "15px" }}
            fullWidth
            name="answer"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
      <Box display="flex" justifyContent="flex-end" marginBottom='15px'>
          <Button
          style={{ marginRight: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => {
              addAnswer(answer);
              setAnswer('');
            }}
          >
            Add
          </Button>
      
          <Button
            variant="contained"
            color="secondary"
            onClick={hideForm}
          >
            Cancel
          </Button>
          </Box>
        </>
      );
}

AnswerForm.propTypes = {
    addAnswer: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
}

export default AnswerForm;