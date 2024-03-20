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
