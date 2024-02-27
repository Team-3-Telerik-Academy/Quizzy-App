import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          My Website
        </Typography>
        <Box>
          <Button
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
        <Box style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            style={{
              color: "rgb(3, 165, 251)",
              border: "1px solid rgb(3, 165, 251)",
              textTransform: 'none'
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "rgb(3, 165, 251)", textTransform: 'none' }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
