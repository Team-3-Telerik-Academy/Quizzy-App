import { Typography } from "@mui/material";


const AboutUs = () => {
  return (
    <div
      className="about_us_content"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        style={{ marginTop: "50px", fontFamily: "Georgia, serif" }}
      >
        About us
      </Typography>
      <Typography
        component="h2"
        variant="h4"
        style={{ marginTop: "20px", fontFamily: "Georgia, serif" }}
      >
        The Masterminds behind{" "}
        <span style={{ color: "rgb(3, 165, 251)" }}>Quizzy Application</span>
      </Typography>
    
    </div>
  );
};

export default AboutUs;
