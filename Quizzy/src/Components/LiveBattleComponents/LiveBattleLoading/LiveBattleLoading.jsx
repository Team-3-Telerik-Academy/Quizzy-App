import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const StyledDialogTitle = styled(DialogTitle)({
  textAlign: "center",
  color: "black",
  backgroundColor: "rgb(3,165,251)",
  fontFamily: "Fantasy",
  fontSize: "24px",
});

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  color: "#394E6A",
});

const StyledCircularProgress = styled(CircularProgress)({
  color: "rgb(3,165,251)",
  animationDuration: "4s",
});

/**
 * Renders a loading dialog for live battle.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines whether the dialog is open or not.
 * @param {string} props.text1 - The text to be displayed in the dialog title.
 * @param {string} props.text2 - The text to be displayed in the dialog content (optional).
 * @returns {JSX.Element} The rendered LiveBattleLoading component.
 */
const LiveBattleLoading = ({ open, text1, text2 }) => {
  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <StyledDialogTitle>
        {text1}
      </StyledDialogTitle>
      {text2 && (
        <StyledDialogContent>
          <Box my={2}>
            <StyledCircularProgress />
          </Box>
          <Typography variant="body1" style={{ fontFamily: "Fantasy" }}>
            {text2}
          </Typography>
        </StyledDialogContent>
      )}
    </Dialog>
  );
};

LiveBattleLoading.propTypes = {
  open: PropTypes.bool.isRequired,
  text1: PropTypes.string,
  text2: PropTypes.string,
};

export default LiveBattleLoading;
