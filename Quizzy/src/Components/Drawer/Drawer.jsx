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
          {
            text: "Quizzes",
            icon: <Quiz />,
            click: () => navigate("/quizzes"),
          },
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
              ]
            : []),
          {
            text: "Friends",
            icon: <People />,
            click: () => navigate("/friends"),
          },
          {
            text: "Messenger",
            icon: <Sms />,
            click: () => navigate("/messenger"),
          },
          {
            text: "Live Battle",
            icon: <Games />,
            click: () => navigate("/liveBattle"),
          },
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
