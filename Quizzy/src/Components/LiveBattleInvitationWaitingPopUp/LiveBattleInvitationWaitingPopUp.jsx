import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Button, DialogActions } from "@mui/material";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "white",
  },
  "& .MuiLinearProgress-colorPrimary": {
    backgroundColor: theme.palette.grey[400],
  },
}));

const LiveBattleInvitationWaitingPopUp = ({
  open,
  handleCancel,
  name,
}) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            handleCancel();
            return 100;
          }
          return Math.min(oldProgress + 5, 100);
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [open, handleCancel]);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          minHeight: "200px",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" style={{ textAlign: "center", fontSize: '24px', fontFamily: 'Poppins'}}>
        {`Waiting for ${name} to respond to your live battle invitation`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ textAlign: "center", marginBottom: "20px", fontSize: "20px", fontFamily: 'Poppins' }}
        >
          You can cancel the invitation if you no longer want to wait.
        </DialogContentText>
        <StyledLinearProgress variant="determinate" value={progress} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="inherit" autoFocus>
          Cancel Invitation
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LiveBattleInvitationWaitingPopUp.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
  name: PropTypes.string,
};

export default LiveBattleInvitationWaitingPopUp;