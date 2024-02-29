import { Button, Typography } from "@mui/material";
import brainIcon from "..//..//Images/brain-icon.svg";
import testIcon from "..//..//Images/test-icon.svg";
import starIcon from "..//..//Images/star-icon.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="about_us_content"
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        style={{
          marginTop: "30px",
          fontWeight: "bold",
          color: "#353535",
          textAlign: "center",
          fontFamily: "Georgia, serif",
          marginBottom: "5px",
        }}
      >
        Explore mind-bending challenges and expand your horizons with <br />
        <span style={{ color: "rgba(3,165,251)", marginTop: "3px" }}>
          Quizzy!
        </span>
      </Typography>
      <Typography
        component="h2"
        variant="h5"
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#353535",
          fontFamily: "Georgia, serif",
        }}
      >
        <span style={{ color: "rgb(3,165,251)" }}>Quizzy</span> is a thrilling
        application where curiosity unfurls its wings,
        <br />
        and <br />
        every answer becomes a constellation in the vast sky of knowledge.{" "}
        <img
          src={starIcon}
          style={{ width: "35px", height: "30px" }}
          alt=""
        />{" "}
        <img src={brainIcon} style={{ width: "35px", height: "30px" }} alt="" />{" "}
        <img
          src={testIcon}
          style={{ width: "35px", height: "30px" }}
          alt=""
        />
      </Typography>
      <Button
        onClick={() => navigate("/signUp")}
        variant="contained"
        style={{
          marginTop:'15px',
          backgroundColor: "rgb(3, 165, 251)",
          textTransform: "none",
          borderRadius:'20px',
          width:'120px',
          height:'45px',
          // fontFamily: "Georgia, serif",
          fontWeight:'500'
        }}
      >
        Get started
      </Button>
    </div>
  );
};

export default Home;
