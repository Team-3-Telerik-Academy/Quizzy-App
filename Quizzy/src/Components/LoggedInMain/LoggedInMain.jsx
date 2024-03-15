import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerComponent from "../Drawer/Drawer";
import Loading from "../Loading/Loading";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import LoggedInHeader from "../LoggedInHeader/LoggedInHeader";
import propTypes from "prop-types";

const LoggedInMain = ({ children }) => {
  const { userData } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!userData?.image ? (
        <Loading />
      ) : (
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
