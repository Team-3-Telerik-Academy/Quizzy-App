import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "white",
  },
  "& .MuiLinearProgress-colorPrimary": {
    backgroundColor: theme.palette.grey[400],
  },
}));

const LiveBattleInvitationPopUp = ({
  open,
  handleDecline,
  handleAccept,
  name,
}) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            handleDecline();
            return 100;
          }
          return Math.min(oldProgress + 5, 100);
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [open, handleDecline]);

  return (
    <Dialog
      open={open}
      onClose={handleDecline}
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
        {`You received a new invitation for a live battle from ${name}`}
      </DialogTitle>
    <DialogContent>
        <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", marginBottom: "20px", fontSize: "20px", fontFamily: 'Poppins' }}
        >
            What would you like to do next?
        </DialogContentText>
        <StyledLinearProgress variant="determinate" value={progress} />
    </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} color="inherit">
          Accept
        </Button>
        <Button onClick={handleDecline} color="inherit" autoFocus>
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LiveBattleInvitationPopUp.propTypes = {
  open: PropTypes.bool,
  handleDecline: PropTypes.func,
  handleAccept: PropTypes.func,
  name: PropTypes.string,
};

export default LiveBattleInvitationPopUp;
