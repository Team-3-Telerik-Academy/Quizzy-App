import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../../config/firebase-config";
import PropTypes from "prop-types";
import AppContext from "../../../Context/AppContext";
import { useContext } from "react";
import Loading from "../../Loading/Loading";

/**
 * Higher-order component that checks if the user is authenticated.
 * If the user is not authenticated, it redirects to the sign-in page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {ReactNode} - The child components if the user is authenticated, otherwise it redirects to the sign-in page.
 */
const Authenticated = ({ children }) => {
  const { userData } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (!loading && !user) {
    return <Navigate replace to="/signIn" state={{ from: location.pathname }} />;
  }

  return <>{userData ? children : <Loading />}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authenticated;
