import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Renders a user profile picture with an optional status indicator.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.image - The URL of the user's profile picture.
 * @param {string} [props.status] - The status of the user (e.g., "online", "offline").
 * @param {string} [props.height] - The height of the profile picture (default: "40px").
 * @param {string} [props.width] - The width of the profile picture (default: "40px").
 * @param {function} [props.onClick] - The click event handler for the profile picture.
 * @returns {JSX.Element} The rendered UserProfilePic component.
 */
const UserProfilePic = ({ image, status, height, width, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: width || "40px",
        height: height || "40px",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <Avatar src={image} style={{ height: "100%", width: "100%" }} />
      <div
        style={{
          width: "25%",
          height: "25%",
          borderRadius: "50%",
          position: "absolute",
          right: "7%",
          bottom: "2%",
          backgroundColor: status === "online" ? "#44b700" : "#ccc",
          zIndex: "10",
          outline: "2px solid white",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      ></div>
    </div>
  );
};

UserProfilePic.propTypes = {
  image: PropTypes.string,
  status: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
};

export default UserProfilePic;
