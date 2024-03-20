import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import UserProfilePic from "../UserProfilePic/UserProfilePic";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

/**
 * Renders a single user square view component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user information.
 * @param {Function} props.handleMessage - The function to handle sending a message to the user.
 * @returns {JSX.Element} The rendered SingleUserSquareView component.
 */
const SingleUserSquareView = ({ user, handleMessage }) => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  return (
    <Box
      key={user.email}
      sx={{ display: "flex", fontFamily: "inter,sans-serif" }}
    >
      <Box
        sx={{
          width: "300px",
          height: "85px",
          boxShadow: "4",
          borderRadius: "15px",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <UserProfilePic
          image={user.image}
          status={user.status}
          onClick={() => navigate(`/profile/${user.username}`)}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "14px",
            marginLeft: "10px",
          }}
        >
          <span style={{ color: "black", fontWeight: "bold" }}>
            {user.firstName}
          </span>
          <span>{user.lastName}</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "14px",
            marginLeft: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "115px",
              height: "auto",
              fontSize: "9.8px",
              marginBottom: "5px",
              marginLeft: "10px",
              backgroundColor: "rgb(3,165,251)",
              color: "white",
            }}
            onClick={() =>
              handleMessage(user, userData, navigate, "/Messenger")
            }
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

SingleUserSquareView.propTypes = {
  user: PropTypes.object,
  handleMessage: PropTypes.func,
};

export default SingleUserSquareView;
