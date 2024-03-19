import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addQuizToLiveBattle,
  getLiveBattleById,
  listenToLiveBattle,
  updateLiveBattle,
} from "../../services/live-battle.services";
import AppContext from "../../Context/AppContext";
import { getLiveBattleQuestions } from "../../services/request-service";

const LiveBattle = () => {
  const { battleId } = useParams();
  const { userData } = useContext(AppContext);
  const [liveBattle, setLiveBattle] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [categoriesView, setCategoriesView] = useState(true);
  const [loading, setLoading] = useState(false);

  const [chosenCategory, setChosenCategory] = useState({});

  useEffect(() => {
    getLiveBattleById(battleId).then((data) => {
      setLiveBattle(data);
      listenToLiveBattle(battleId, (data) => {
        setLiveBattle(data);
      });
    });
  }, []);

  useEffect(() => {
    if (liveBattle && liveBattle.category1 && liveBattle.category2) {
      getLiveBattleQuestions(
        liveBattle.category1.value,
        liveBattle.category2.value
      ).then((data) => {
        addQuizToLiveBattle(battleId, "Live Battle Quiz", data);
      });
    }

    if (liveBattle && liveBattle.quiz) {
      setQuiz(liveBattle.quiz);
      setCategoriesView(false);
      setLoading(false);
    }
  }, [liveBattle]);

  const handleCategory = (category) => {
    setChosenCategory(category);
  };

  const handleSubmitCategory = (category) => {
    setLoading(true);
    if (userData.username === liveBattle.player1) {
      updateLiveBattle(battleId, "category1", category);
    } else {
      updateLiveBattle(battleId, "category2", category);
    }
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
    <>
      {categoriesView ? (
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
            Below, you&apos;ll have the opportunity to choose a{" "}
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
            <span style={{ color: "rgb(3,165,251)" }}>5</span> random questions
            will be generated and included in the Quiz battle.
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
                <>
                  <Box
                    key={category.value}
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
                        chosenCategory.value === category.value
                          ? "white"
                          : "#394e6a",
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
                  <Button
                    variant="contained"
                    sx={{
                      width: "107px",
                      height: "auto",
                      fontSize: "10px",
                      marginBottom: "5px",
                      marginLeft: "15px",
                      backgroundColor: "rgb(3,165,251)",
                      color: "white",
                    }}
                    onClick={() => handleSubmitCategory(category)}
                  >
                    Select
                  </Button>
                </>
              );
            })}
          </Box>
          {loading && <CircularProgress />}
        </Box>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

export default LiveBattle;
