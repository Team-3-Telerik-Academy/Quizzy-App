import { useContext, useState } from "react";
import {
  styled,
  alpha,
  InputBase,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Switch,
  Badge,
  AppBar as MuiAppBar,
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
} from "@mui/icons-material";
import propTypes from "prop-types";
import { logoutUser } from "../../services/auth.service";
import toast from "react-hot-toast";
import AppContext from "../../Context/AppContext";
import QuizzyLogo from "..//..//Images/logo.png";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "30ch" },
  },
}));

const LoggedInHeader = ({ open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { userData, setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logoutUser().then(() => {
      toast.success("You have logged out successfully!", {
        position: "bottom-right",
      });
      setAppState({
        user: null,
        userData: null,
      });
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
        {/* <Typography variant="h6" noWrap component="div">
          Quizzy
        </Typography> */}
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
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
              src={userData?.avatar}
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
        <MenuItem onClick={() => {handleMenuClose(); navigate('/profile')}}>Profile</MenuItem>
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
              src={userData?.avatar}
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
