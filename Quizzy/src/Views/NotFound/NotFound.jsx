import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import notFound from "../../Images/not-found.png";

const NotFound = () => (
  <Box
    sx={{
      position: "relative",
      backgroundColor: "#04A9EB",
      color: "white",
      height: "100vh",
      display: "flex",
      alignItems: "center",
    }}
  >
    <div style={{ width: "50%", marginLeft: "60px", textAlign: "center" }}>
      <Typography variant="h3" component="div" gutterBottom>
        This page is out of questions! Let&apos;s head back and find a quiz
        that&apos;s ready for you.
      </Typography>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#3C5A9A",
          fontSize: "15px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        href="/"
      >
        Back Home
      </Button>
    </div>
    <img
      src={notFound}
      alt="Error 404"
      style={{
        width: "50%",
        height: "auto",
        position: "absolute",
        bottom: "0",
        right: "0",
      }}
    />
  </Box>
);

export default NotFound;
