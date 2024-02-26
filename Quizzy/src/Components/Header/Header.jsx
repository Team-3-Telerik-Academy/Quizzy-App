import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          My Website
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Public Quizzes</Button>
        </Box>
        <Box style={{ display: "flex", gap: "10px" }}>
          <Button variant="outlined" style={{color: 'rgb(3, 165, 251)', border: '1px solid rgb(3, 165, 251)'}}>Sign In</Button>
          <Button variant="contained" style={{backgroundColor: 'rgb(3, 165, 251)'}}>Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
