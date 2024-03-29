import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerComponent from "../Drawer/Drawer";
import LoggedInHeader from "../LoggedInHeader/LoggedInHeader";
import propTypes from "prop-types";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { deleteNotification } from "../../services/users.service";
import { acceptLiveBattleInvitation } from "../../services/live-battle.services";
import { useNavigate } from "react-router-dom";
import LiveBattleInvitationPopUp from "../LiveBattleComponents/LiveBattleInvitationPopUp/LiveBattleInvitationPopUp";

/**
 * Represents the main component for the logged-in user.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const LoggedInMain = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { userData } = useContext(AppContext);
  const [liveBattlePopUpOpen, setLiveBattlePopUpOpen] = useState(true);
  const navigate = useNavigate();

  const handleDecline = (senderUsername) => {
    setLiveBattlePopUpOpen(false);
    deleteNotification(
      userData.username,
      "liveBattleInvitations",
      senderUsername
    ).then(() => {
      deleteNotification(
        senderUsername,
        "liveBattleWaitingInvitations",
        userData.username
      );
    });
  };

  const handleAccept = () => {
    setLiveBattlePopUpOpen(false);
    acceptLiveBattleInvitation(
      userData,
      Object.keys(userData.liveBattleInvitations)[0],
      Object.values(userData.liveBattleInvitations)[0]
    ).then((liveBattleId) => {
      deleteNotification(
        userData.username,
        "liveBattleInvitations",
        Object.keys(userData.liveBattleInvitations)[0]
      )
        .then(() => {
          deleteNotification(
            Object.keys(userData.liveBattleInvitations)[0],
            "liveBattleWaitingInvitations",
            userData.username
          );
        })
        .then(() => navigate(`/battle/${liveBattleId}`));
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {userData && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <LoggedInHeader open={open} handleDrawerOpen={handleDrawerOpen} />
          <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
            style={{ padding: "0", marginTop: "14px" }}
          >
            <br />
            {children}
            {userData.liveBattleInvitations && (
              <LiveBattleInvitationPopUp
                open={liveBattlePopUpOpen}
                handleDecline={() =>
                  handleDecline(Object.keys(userData.liveBattleInvitations)[0])
                }
                handleAccept={handleAccept}
                name={Object.values(userData.liveBattleInvitations)[0]}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

LoggedInMain.propTypes = {
  children: propTypes.node.isRequired,
};

export default LoggedInMain;
