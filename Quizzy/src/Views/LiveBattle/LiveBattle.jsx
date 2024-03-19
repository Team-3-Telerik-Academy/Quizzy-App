import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LiveBattle = () => {
  const { id } = useParams();

  const [chosenCategory, setChosenCategory] = useState({});

  const handleCategory = (category) => {
    setChosenCategory(category);
  };

  const categories = [
    { name: "General Knowledge", value: "9" },
    { name: "Computers", value: "18" },
    { name: "Geography", value: "22" },
    { name: "History", value: "23" },
    { name: "Math", value: "19" },
    { name: "Science & Nature", value: "17" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#394e6a",
          fontFamily: "fantasy",
          marginTop: "40px",
          marginBottom: "15px",
        }}
      >
        You are one step away from getting into the{" "}
        <span style={{ color: "rgb(3,165,251)" }}>Arena</span>!
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#394e6a",
          fontFamily: "fantasy",
          marginBottom: "15px",
        }}
      >
        Below, you'll have the opportunity to choose a{" "}
        <span style={{ color: "rgb(3,165,251)" }}>Category</span> you feel
        confident about.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#394e6a",
          fontFamily: "fantasy",
          marginBottom: "15px",
        }}
      >
        <span style={{ color: "rgb(3,165,251)" }}>5</span> random questions will
        be generated and included in the Quiz battle.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#394e6a",
          fontFamily: "fantasy",
          marginBottom: "15px",
        }}
      >
        Same goes for the other{" "}
        <span style={{ color: "rgb(3,165,251)" }}>Player</span>.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#394e6a",
          fontFamily: "fantasy",
          marginBottom: "25px",
        }}
      >
        Pick a <span style={{ color: "rgb(3,165,251)" }}>Category</span>:
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          gap: "15px",
          cursor: "pointer",
          justifyContent: "center",
        }}
      >
        {categories.map((category) => {
          return (
            <Box
              value={category.value}
              sx={{
                boxShadow: "4",
                width: "160px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
                transition: "transform 0.2s",
                fontFamily: "fantasy",
                // color: "#394e6a",
                color:
                  chosenCategory.value === category.value ? "white" : "#394e6a",
                backgroundColor:
                  chosenCategory.value === category.value
                    ? "rgb(3,165,251)"
                    : "white",
              }}
              onClick={() => handleCategory(category)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {category.name}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default LiveBattle;
