import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase-config";
import AppContext from "../../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Higher-order component that provides authentication and authorization for educator users.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render if the user is authenticated and authorized.
 * @returns {ReactNode} - The rendered child components if the user is authenticated and authorized, or redirects to the sign-in or home page.
 */
const AuthenticatedEducator = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const { userData } = useContext(AppContext);
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      setReady(true);
    }
  }, [userData]);

  return (
    <>
      {!loading && !user ? (
        <Navigate replace to="/signIn" state={{ from: location.pathname }} />
      ) : !loading && user && ready && userData.role === 'educator' ? (
        children
      ) : (
        ready &&
        userData.role !== 'educator' && (
          <Navigate replace to="/" state={{ from: location.pathname }} />
        )
      )}
    </>
  );
};

AuthenticatedEducator.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedEducator;
