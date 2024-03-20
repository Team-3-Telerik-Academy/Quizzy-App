import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  MoreVert as MoreIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import AppContext from "../../Context/AppContext";
import { logoutUser } from "../../services/auth.service";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { styled, AppBar as MuiAppBar } from "@mui/material";
import UserProfilePic from "../UserProfilePic/UserProfilePic";
const drawerWidth = 0;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "rgb(3, 165, 251)",
}));

/**
 * AdminHeader component displays the header for the admin section of the application.
 * It includes a user profile picture, a menu for profile and logout options, and a mobile menu for smaller screens.
 *
 * @component
 * @example
 * return (
 *   <AdminHeader />
 * )
 */
const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { userData, setUserData, setUserCredentials } = useContext(AppContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logoutUser().then(() => {
      toast.success("You have logged out successfully!", {
        position: "bottom-right",
      });
      setUserData(null);
      setUserCredentials(null);
      navigate("/");
    });
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <UserProfilePic image={userData?.image} status={userData?.status} />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={onLogout}>
          Logout
          <LogoutIcon sx={{ ml: 1 }} />
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <img
              src={userData?.image}
              alt={userData?.username}
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default AdminHeader;
