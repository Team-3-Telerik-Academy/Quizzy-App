import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerComponent from "../Drawer/Drawer";
import LoggedInHeader from "../LoggedInHeader/LoggedInHeader";
import propTypes from "prop-types";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import LiveBattleInvitationPopUp from "../LiveBattleInvitationPopUp/LiveBattleInvitationPopUp";
import { deleteNotification } from "../../services/users.service";
import { acceptLiveBattleInvitation } from "../../services/live-battle.services";

const LoggedInMain = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { userData } = useContext(AppContext);
  const [liveBattlePopUpOpen, setLiveBattlePopUpOpen] = useState(true);

  const handleDecline = () => {
    setLiveBattlePopUpOpen(false);
    deleteNotification(
      userData.username,
      "liveBattleInvitations",
      Object.keys(userData.liveBattleInvitations)[0]
    );
  };

  const handleAccept = () => {
    setLiveBattlePopUpOpen(false);
    acceptLiveBattleInvitation(
      userData,
      Object.keys(userData.liveBattleInvitations)[0],
      Object.values(userData.liveBattleInvitations)[0]
    ).then(() => {
      deleteNotification(
        userData.username,
        "liveBattleInvitations",
        Object.keys(userData.liveBattleInvitations)[0]
      );
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
                handleDecline={handleDecline}
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
