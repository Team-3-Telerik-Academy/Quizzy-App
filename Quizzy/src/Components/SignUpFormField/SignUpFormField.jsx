import { Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

const SignUpFormField = ({ value, onChange, name, label }) => {
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
      />
    </Grid>
  );
};

SignUpFormField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default SignUpFormField;
