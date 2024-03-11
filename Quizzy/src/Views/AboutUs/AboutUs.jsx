import { Typography } from "@mui/material";
import Profile from "../../Components/Profile/Profile";

const AboutUs = () => {
  return (
    <div
      className="about_us_content"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        
      }}
    >
      
      <Typography
        component="h2"
        variant="h4"
        style={{ marginTop: "30px", 
        fontFamily: "Georgia, serif", 
        marginBottom: '30px' }}
      >
        The Masterminds behind{" "}
        <span style={{ color: "rgb(3, 165, 251)" }}>Quizzy Application</span>
      </Typography>
      <Profile />
    </div>
  );
};

export default AboutUs;
