import { useContext, useEffect, useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
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
import SingleNotification from "../SingleNotification/SingleNotification";
import { getAllPublicQuizzes } from "../../services/quizzes.service";
import { getAllUsers } from "../../services/users.service";
import UserProfilePic from "../UserProfilePic/UserProfilePic";
import SingleMessageNotification from "../SingleMessageNotification/SingleMessageNotification";

const LoggedInHeader = ({ open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { userData, setUserData, setUserCredentials, setChatUser } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [openedNotifications, setOpenedNotifications] = useState(
    localStorage.getItem("openedNotifications")
      ? Number(localStorage.getItem("openedNotifications"))
      : 0
  );

  const [allPublicQuizzes, setAllPublicQuizzes] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [messagesEl, setMessagesEl] = useState(null);
  const [messages, setMessages] = useState(0);
  const [allMessages, setAllMessages] = useState(null);
  const [openedMessages, setOpenedMessages] = useState(
    localStorage.getItem("openedMessages")
      ? Number(localStorage.getItem("openedMessages"))
      : 0
  );

  useEffect(() => {
    if (userData) {
      setMessages(
        (userData?.messageNotifications
          ? Object.keys(userData.messageNotifications).length
          : 0) - openedMessages
      );
      setAllMessages(
        userData?.messageNotifications &&
          Object.values(userData.messageNotifications).reverse()
      );
    }
  }, [userData, openedMessages]);

  useEffect(() => {
    localStorage.setItem("openedMessages", openedMessages);
  }, [openedMessages]);

  const handleMessagesOpen = (event) => {
    if (!userData.messageNotifications) return;

    setOpenedMessages(messages + openedMessages);
    setMessagesEl(event.currentTarget);
    setMessages(0);
  };

  const handleMessagesClose = () => {
    setMessagesEl(null);
  };

  const handleShowInMessenger = (senderUsername) => {
    setChatUser(senderUsername);
    navigate("/Messenger");
  };

  useEffect(() => {
    if (searchInput) {
      const quizzes = allPublicQuizzes
        .filter((quiz) =>
          quiz.title.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 5);
      const users = allUsers
        .filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 5);
      setSearchResults([...quizzes, ...users]);
    } else {
      setSearchResults([]);
    }
  }, [searchInput, allPublicQuizzes, allUsers]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/search", { state: { searchInput: searchInput } });
  };

  const handleResultSelect = (result) => {
    const quizKey = userData.takenQuizzes
      ? Object.entries(userData.takenQuizzes).find(
          // eslint-disable-next-line no-unused-vars
          ([_, quiz]) => quiz.id === result.id
        )?.[0]
      : null;

    if (quizKey) {
      setSearchInput("");
      navigate(`/takenQuizzes`, { state: { searchedQuizId: quizKey } });
    } else if (result.title) {
      setSearchInput("");
      navigate(`/quizzes`, { state: { searchedQuizzes: result } });
    } else {
      setSearchInput("");
      navigate(`/profile/${result.username}`);
    }
  };

  useEffect(() => {
    getAllPublicQuizzes()
      .then(setAllPublicQuizzes)
      .then(() => getAllUsers().then(setAllUsers));
  }, []);

  useEffect(() => {
    localStorage.setItem("openedNotifications", openedNotifications);
  }, [openedNotifications]);

  useEffect(() => {
    if (userData) {
      setNotifications(
        (userData?.quizInvitations
          ? Object.keys(userData.quizInvitations).length
          : 0) +
          (userData?.groupInvitations
            ? Object.keys(userData.groupInvitations).length
            : 0) +
          (userData?.quizCommentsNotifications
            ? Object.keys(userData.quizCommentsNotifications).length
            : 0) +
          (userData?.quizRepliesNotifications
            ? Object.keys(userData.quizRepliesNotifications).length
            : 0) +
          (userData?.friendRequests
            ? Object.keys(userData.friendRequests).length
            : 0) -
          openedNotifications
      );
    }
  }, [userData]);

  const handleNotificationsOpen = (event) => {
    if (
      (userData?.quizInvitations
        ? Object.keys(userData.quizInvitations).length
        : 0) +
        (userData?.groupInvitations
          ? Object.keys(userData.groupInvitations).length
          : 0) +
        (userData?.quizCommentsNotifications
          ? Object.keys(userData.quizCommentsNotifications).length
          : 0) +
        (userData?.quizRepliesNotifications
          ? Object.keys(userData.quizRepliesNotifications).length
          : 0) +
        (userData?.friendRequests
          ? Object.keys(userData.friendRequests).length
          : 0) ===
      0
    )
      return;

    if (notifications !== 0)
      setOpenedNotifications(notifications + openedNotifications);

    setAnchorElNotifications(event.currentTarget);
    setNotifications(0);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const onLogout = () => {
    logoutUser().then(() => {
      toast.success("You have logged out successfully!", {
        position: "bottom-right",
      });

      setUserData(null);
      setUserCredentials(null);

      navigate("/");
      window.location.reload();
      localStorage.clear();
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
        <Search onSubmit={handleSearchSubmit}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{ width: "30ch" }}
            value={searchInput}
            onChange={handleSearchChange}
          />
          {searchInput && (
            <Paper
              style={{ position: "absolute", marginTop: 8, width: "27.2ch" }}
            >
              {searchResults.map((result, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleResultSelect(result)}
                >
                  {result.title || result.username}
                </MenuItem>
              ))}
            </Paper>
          )}
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton size="large" color="inherit" onClick={handleMessagesOpen}>
            <Badge badgeContent={messages} color="secondary">
              <EmailIcon />
            </Badge>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={messagesEl}
            keepMounted
            open={Boolean(messagesEl)}
            onClose={handleMessagesClose}
          >
            {allMessages &&
              allMessages.map((message) => (
                <SingleMessageNotification
                  key={message.username}
                  message={message}
                  handleShowInMessenger={handleShowInMessenger}
                />
              ))}
          </Menu>
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
              Object.keys(userData.quizInvitations).map((invitation) => (
                <SingleNotification
                  key={invitation}
                  invitation={invitation}
                  value="quizInvitations"
                  handleNotificationsClose={handleNotificationsClose}
                  setOpenedNotifications={setOpenedNotifications}
                />
              ))}
            {userData?.groupInvitations &&
              Object.keys(userData.groupInvitations).map((invitation) => (
                <SingleNotification
                  key={invitation}
                  invitation={invitation}
                  value="groupInvitations"
                  handleNotificationsClose={handleNotificationsClose}
                  setOpenedNotifications={setOpenedNotifications}
                />
              ))}
            {userData?.friendRequests &&
              Object.keys(userData.friendRequests).map((invitation) => (
                <SingleNotification
                  key={invitation}
                  invitation={invitation}
                  value="friendRequests"
                  handleNotificationsClose={handleNotificationsClose}
                  setOpenedNotifications={setOpenedNotifications}
                />
              ))}
            {userData?.quizCommentsNotifications &&
              Object.keys(userData.quizCommentsNotifications).map((id) => (
                <SingleNotification
                  key={id}
                  invitation={userData.quizCommentsNotifications[id]}
                  id={id}
                  value="quizCommentsNotifications"
                  handleNotificationsClose={handleNotificationsClose}
                  setOpenedNotifications={setOpenedNotifications}
                />
              ))}
            {userData?.quizRepliesNotifications &&
              userData.role === "student" &&
              Object.keys(userData.quizRepliesNotifications).map((id) => (
                <SingleNotification
                  key={id}
                  invitation={userData.quizRepliesNotifications[id]}
                  id={id}
                  value="quizRepliesNotifications"
                  handleNotificationsClose={handleNotificationsClose}
                  setOpenedNotifications={setOpenedNotifications}
                />
              ))}
            {userData?.quizRepliesNotifications &&
              userData.role === "educator" &&
              Object.values(userData.quizRepliesNotifications).map(
                (notification, index) => (
                  <SingleNotification
                    key={Object.keys(userData.quizRepliesNotifications)[index]}
                    invitation={notification}
                    id={Object.keys(userData.quizRepliesNotifications)[index]}
                    value="quizRepliesNotifications"
                    handleNotificationsClose={handleNotificationsClose}
                    setOpenedNotifications={setOpenedNotifications}
                  />
                )
              )}
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
            navigate(`/profile/${userData?.username}`);
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
            <UserProfilePic image={userData?.image} />
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
