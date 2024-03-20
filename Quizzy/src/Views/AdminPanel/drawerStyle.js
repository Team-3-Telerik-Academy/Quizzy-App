import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 240;

/**
 * Returns the styles for an opened drawer.
 *
 * @param {Object} theme - The theme object.
 * @returns {Object} The styles for an opened drawer.
 */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

/**
 * A mixin function that defines the styles for a closed drawer in the admin panel.
 *
 * @param {Object} theme - The theme object provided by the Material-UI theme provider.
 * @returns {Object} - The CSS styles for the closed drawer.
 */
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(26)} + 1px)`,
  },
});

/**
 * Custom styled component for the Drawer component in the AdminPanel view.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {boolean} props.open - Determines whether the drawer is open or closed.
 * @returns {JSX.Element} The styled Drawer component.
 */
export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/**
 * Represents the styled component for the drawer header in the admin panel.
 *
 * @component
 * @param {Object} theme - The theme object provided by the Material-UI theme provider.
 * @returns {JSX.Element} The JSX element representing the drawer header.
 */
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));    