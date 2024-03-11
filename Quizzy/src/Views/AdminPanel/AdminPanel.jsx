import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerHeader } from "./drawerStyle";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  return (
    <Drawer variant="permanent">
      <AdminHeader />
      <DrawerHeader />
      <Divider />
      <List>
        {[
          {
            text: "Test1",
            //   icon:
            //   click: () => navigate("/")
          },
          {
            text: "Quizzes",
            // icon: ,
            click: () => navigate(""),
          },
          {
            text: "Test2",
            // icon: ,
            // click: () => navigate(""),
          },

          {
            text: "Test3",
            // icon: ,
            // click: () => navigate(""),
          },
          {
            text: "Test4",
            // icon:
            // click: () => navigate(""),
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
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminPanel;
