import {
  Avatar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";

/**
 * Renders a single message notification item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message object containing information about the message.
 * @param {Function} props.handleShowInMessenger - The function to handle showing the message in the messenger.
 * @returns {JSX.Element} The rendered SingleMessageNotification component.
 */
const SingleMessageNotification = ({ message, handleShowInMessenger }) => {
  return (
    <MenuItem onClick={() => handleShowInMessenger(message.username)}>
      <ListItem
        style={{
          backgroundColor: "#f0f0f0",
          border: "1px solid #ddd",
          borderRadius: "5px",
          transition: "transform 0.3s",
          padding: "15px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <ListItemIcon style={{ marginRight: "10px" }}>
          <Avatar
            alt={message.fullName}
            src={message.avatar}
            style={{ height: "50px", width: "50px" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {message.fullName}
            </Box>
          }
          secondary={
            message.message.length > 100
              ? message.message.substring(0, 30) + "..."
              : message.message
          }
        />
      </ListItem>
    </MenuItem>
  );
};

SingleMessageNotification.propTypes = {
  message: PropTypes.object,
  handleShowInMessenger: PropTypes.func,
};

export default SingleMessageNotification;
