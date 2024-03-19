import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledDialogTitle = styled(DialogTitle)({
  textAlign: "center",
  color: "black",
  backgroundColor: "rgb(3,165,251)",
  fontFamily: "Poppins",
  fontSize: "24px",
});

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
});

const StyledCircularProgress = styled(CircularProgress)({
  color: "rgb(3,165,251)",
});

const CreatingLiveBattleLoading = () => {
  return (
    <Dialog open={true}>
      <StyledDialogTitle>
        We are creating the quiz for your battle
      </StyledDialogTitle>
      <StyledDialogContent>
        <Box my={2}>
          <StyledCircularProgress />
        </Box>
      </StyledDialogContent>
    </Dialog>
  );
};

export default CreatingLiveBattleLoading;
