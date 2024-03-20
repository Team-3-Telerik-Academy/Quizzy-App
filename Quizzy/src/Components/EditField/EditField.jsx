import { Box, Button, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

const InfoText = styled(Typography)({
  margin: "1em 0",
});

const InfoInput = styled(TextField)({
  marginBottom: "1em",
  paddingTop: "7px",
  marginRight: "-10px",
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(3, 165, 251)',
    },
  },
});

/**
 * EditField component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the field.
 * @param {string} props.value - The current value of the field.
 * @param {boolean} props.isEditing - Indicates whether the field is in editing mode.
 * @param {Function} props.onEdit - The function to be called when the edit button is clicked.
 * @param {Function} props.onChange - The function to be called when the field value changes.
 * @param {Function} props.onSave - The function to be called when the save button is clicked.
 * @returns {JSX.Element} The rendered EditField component.
 */
const EditField = ({
  label,
  value,
  isEditing,
  onEdit,
  onChange,
  onSave,
}) => (
  <InfoText variant="body1" position="relative">
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      style={{ flexDirection: "column", height: "100%" }}
    >
      <div style={{ lineHeight: "2" }}>
        <strong>{label}:</strong> <br />
        {isEditing ? (
          <InfoInput
            type="text"
            value={value}
            onChange={onChange}
            inputProps={{ style: { padding: "7px" } }}
          />
        ) : (
          <>{value}</>
        )}
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          position: "absolute",
          bottom: "22%",
        }}
      >
        {isEditing ? (
          <Button variant="contained" color="secondary" onClick={onSave}>
            Done
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onEdit}
            style={{ backgroundColor: "rgb(3, 165, 251)" }}
          >
            Edit
          </Button>
        )}
      </div>
    </Box>
  </InfoText>
);

EditField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditField;
