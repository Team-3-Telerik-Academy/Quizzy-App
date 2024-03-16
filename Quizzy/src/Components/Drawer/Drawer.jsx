import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Home from "@mui/icons-material/Home";
import Quiz from "@mui/icons-material/Quiz";
import Create from "@mui/icons-material/Create";
import QuestionMark from "@mui/icons-material/QuestionMark";
import People from "@mui/icons-material/People";
import Sms from "@mui/icons-material/Sms";
import Games from "@mui/icons-material/Games";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import { Drawer, DrawerHeader } from "./drawerStyle";
import { MilitaryTech, Scoreboard } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Groups2Icon from "@mui/icons-material/Groups2";

const DrawerComponent = ({ open, handleDrawerClose }) => {
  const { userData } = useContext(AppContext);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          { text: "Home", icon: <Home />, click: () => navigate("/") },
          ...(userData?.role === "educator"
            ? [
                {
                  text: "Create Quiz",
                  icon: <Create />,
                  click: () => navigate("/createQuiz"),
                },
                {
                  text: "My Quizzes",
                  icon: <QuestionMark />,
                  click: () => navigate("/myQuizzes"),
                },
                {
                  text: "Educator Groups",
                  icon: <Groups2Icon />,
                  click: () => navigate("/educatorGroups"),
                },
              ]
            : []),
          {
            text: "Quizzes",
            icon: <Quiz />,
            click: () => navigate("/quizzes"),
          },
          {
            text: "Taken Quizzes",
            icon: <MilitaryTech />,
            click: () => navigate("/takenQuizzes"),
          },
          {
            text: "Scoreboard",
            icon: <Scoreboard />,
            click: () => navigate("/scoreboard"),
          },
          {
            text: "Friends",
            icon: <People />,
            click: () => navigate("/Friends"),
          },
          {
            text: "Messenger",
            icon: <Sms />,
            click: () => navigate("/Messenger"),
          },
          {
            text: "Live Battle",
            icon: <Games />,
            click: () => navigate("/liveBattle"),
          },
          ...(userData.isAdmin
            ? [
                {
                  text: "Admin",
                  icon: <AdminPanelSettingsIcon />,
                  click: () => navigate("/adminHome"),
                },
              ]
            : []),
          // {
          //   text: "Admin",
          //   icon: <AdminPanelSettingsIcon />,
          //   click: () => navigate("/adminHome"),
          // },
        ].map((item) => (
          <ListItem
            onClick={item.click}
            key={item.text}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

DrawerComponent.propTypes = {
  open: propTypes.bool.isRequired,
  handleDrawerClose: propTypes.func.isRequired,
};

export default DrawerComponent;
