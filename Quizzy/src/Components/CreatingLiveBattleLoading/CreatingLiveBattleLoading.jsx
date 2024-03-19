import { Backdrop as MuiBackdrop, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const Backdrop = styled(MuiBackdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
}));

const CreatingLiveBattleLoading = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CreatingLiveBattleLoading;
