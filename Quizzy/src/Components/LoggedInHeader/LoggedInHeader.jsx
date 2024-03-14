import { useContext, useEffect, useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Switch,
  Badge,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Logout as LogoutIcon,
  Brightness7 as Brightness7Icon,
  Brightness2 as Brightness2Icon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Check,
  Close,
} from "@mui/icons-material";
import propTypes from "prop-types";
import { logoutUser } from "../../services/auth.service";
import toast from "react-hot-toast";
import AppContext from "../../Context/AppContext";
import QuizzyLogo from "..//..//Images/logo.png";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./loggedInHeaderStyle";
import {
  acceptInvitation,
  declineInvitation,
} from "../../services/users.service";
import { getQuizByTitle } from "../../services/quizzes.service";

const LoggedInHeader = ({ open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { userData, setUserData, setUserCredentials } = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    if (userData) {
      setNotifications(
        (userData?.quizInvitations
          ? Object.keys(userData.quizInvitations).length
          : 0) +
          (userData?.groupInvitations
            ? Object.keys(userData.groupInvitations).length
            : 0)
      );
    }
  }, []);

  const handleNotificationsOpen = (event) => {
    if (
      (userData?.quizInvitations
        ? Object.keys(userData.quizInvitations).length
        : 0) +
        (userData?.groupInvitations
          ? Object.keys(userData.groupInvitations).length
          : 0) ===
      0
    )
      return;

    setAnchorElNotifications(event.currentTarget);
    setNotifications(0);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const handleAcceptInvitation = (prop, value) => {
    //to write for groups
    if (prop === "quizInvitations") {
      getQuizByTitle(value)
        .then((quiz) => {
          acceptInvitation(
            userData.username,
            prop,
            value,
            Object.keys(quiz.val())[0],
            setUserData
          );
        })
        .then(() => {
          toast.success("You have accepted the invitation successfully!", {
            position: "bottom-right",
          });
        });
    }
  };

  const handleDeclineInvitation = (prop, value) => {
    //to write for groups
    if (prop === "quizInvitations") {
      getQuizByTitle(value)
        .then((quiz) => {
          declineInvitation(
            userData.username,
            prop,
            value,
            Object.keys(quiz.val())[0],
            setUserData
          );
        })
        .then(() => {
          toast.success("You have declined the invitation!", {
            position: "bottom-right",
          });
        });
    }
  };

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
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          style={{ marginRight: "auto" }}
        >
          <img
            src={QuizzyLogo}
            style={{
              width: "70px",
              height: "45px",
              marginTop: "10px",
              marginRight: "10px",
            }}
          />
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{ width: "30ch" }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton size="large" color="inherit">
            <Brightness7Icon sx={{ fontSize: 20 }} />
            <Switch />
            <Brightness2Icon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <EmailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={notifications} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorElNotifications}
            keepMounted
            open={Boolean(anchorElNotifications)}
            onClose={handleNotificationsClose}
            style={{ border: "1px solid #ddd" }}
          >
            {userData?.quizInvitations &&
              Object.keys(userData.quizInvitations).map((invitation) => {
                return (
                  <MenuItem
                    key={invitation}
                    onClick={handleNotificationsClose}
                    style={{ color: "#333", fontSize: "14px" }}
                  >
                    You have been invited from{" "}
                    {userData.quizInvitations[invitation]} to take the{" "}
                    {invitation} quiz
                    <IconButton
                      onClick={() =>
                        handleAcceptInvitation("quizInvitations", invitation)
                      }
                      style={{ color: "green", marginLeft: "10px" }}
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeclineInvitation("quizInvitations", invitation)
                      }
                      style={{ color: "red", marginLeft: "10px" }}
                    >
                      <Close />
                    </IconButton>
                  </MenuItem>
                );
              })}
          </Menu>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <img
              src={userData?.image}
              alt={userData?.username}
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            />
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
            navigate(`/profile/${userData.username}`);
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

LoggedInHeader.propTypes = {
  open: propTypes.bool.isRequired,
  handleDrawerOpen: propTypes.func.isRequired,
};

export default LoggedInHeader;
