import AdminHeader from "../AdminHeader/AdminHeader";
import AdminPanel from "../../Views/AdminPanel/AdminPanel";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import Loading from "../Loading/Loading";
import { Box, CssBaseline } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Renders the main admin layout.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered inside the main layout.
 * @returns {JSX.Element} The rendered AdminMain component.
 */
const AdminMain = ({ children }) => {
  const { userData } = useContext(AppContext);

  return (
    <>
      {!userData ? (
        <Loading />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AdminHeader />
          <AdminPanel />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
            style={{ padding: "0", height: '100%' }}
          >
            <br />
            {children}
          </Box>
        </Box>
      )}
    </>
  );
};

AdminMain.propTypes = {
  children: PropTypes.node,
};

export default AdminMain;
