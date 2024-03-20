import { Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

/**
 * A form field component used for sign up forms.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the form field.
 * @param {function} props.onChange - The function to handle value changes in the form field.
 * @param {string} props.name - The name of the form field.
 * @param {string} props.label - The label for the form field.
 * @param {string} props.type - The type of the form field.
 * @returns {JSX.Element} The rendered SignUpFormField component.
 */
const SignUpFormField = ({ value, onChange, name, label, type }) => {
  return (
    <Grid item xs={12}>
      <TextField
        value={value}
        onChange={onChange}
        autoComplete={name}
        name={name}
        variant="outlined"
        required
        fullWidth
        id={name}
        label={label}
        autoFocus
        size="small"
        style={{ borderRadius: "10px" }}
        type={type}
      />
    </Grid>
  );
};

SignUpFormField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SignUpFormField;
