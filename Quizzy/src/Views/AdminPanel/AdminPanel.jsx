import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerHeader } from "./drawerStyle";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

/**
 * Renders the AdminPanel component.
 *
 * @component
 * @returns {JSX.Element} The rendered AdminPanel component.
 */
const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent">
      <AdminHeader />
      <DrawerHeader />
      <Divider />
      <List>
        {[
          {
            text: "Admin Home",
            icon: <HomeIcon />,
            click: () => navigate("/adminHome"),
          },
          {
            text: "Exit Admin Panel",
            icon: <LogoutIcon />,
            click: () => navigate("/"),
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
