import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        color: "black",
        zIndex: '1',
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h6"
          component="div"
          style={{ marginRight: "auto" }}
        >
          My Website
        </Typography>
        <Box style={{ marginLeft: "100px" }}>
          <Button
            onClick={() => navigate("/")}
            color="inherit"
            style={{ fontSize: "15px", textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            style={{ fontSize: "15px", textTransform: "none" }}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            style={{ fontSize: "15px", textTransform: "none" }}
          >
            Public Quizzes
          </Button>
        </Box>
        <Box style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
          <Button
            onClick={() => navigate("/signIn")}
            variant="outlined"
            style={{
              color: "rgb(3, 165, 251)",
              border: "1px solid rgb(3, 165, 251)",
              textTransform: "none",
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/signUp")}
            variant="contained"
            style={{
              backgroundColor: "rgb(3, 165, 251)",
              textTransform: "none",
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
