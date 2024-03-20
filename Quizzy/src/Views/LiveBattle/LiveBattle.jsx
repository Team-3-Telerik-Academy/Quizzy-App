import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addQuizToLiveBattle,
  getLiveBattleById,
  listenToLiveBattle,
  updateLiveBattle,
} from "../../services/live-battle.services";
import AppContext from "../../Context/AppContext";
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Loading from "../../Components/Loading/Loading";
import { getQuizQuestions } from "../../services/request-service";
import LiveBattleLoading from "../../Components/LiveBattleComponents/LiveBattleLoading/LiveBattleLoading";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(3,165,251)",
      contrastText: "#ffffff",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LiveBattle = () => {
  const navigate = useNavigate();
  const { battleId } = useParams();
  const { userData } = useContext(AppContext);
  const [liveBattle, setLiveBattle] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [categoriesView, setCategoriesView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [buttonColor, setButtonColor] = useState("rgb(3,165,251)");
  const [points, setPoints] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [index, setIndex] = useState(0);
  const [chosenCategory, setChosenCategory] = useState({});
  const length = questions?.length;

  useEffect(() => {
    getLiveBattleById(battleId).then((data) => {
      setLiveBattle(data);
      listenToLiveBattle(battleId, setLiveBattle);
    });
  }, [battleId]);

  useEffect(() => {
    if (
      liveBattle &&
      (liveBattle.player1Score || liveBattle.player1Score === 0) &&
      (liveBattle.player2Score || liveBattle.player2Score === 0)
    ) {
      setLoading(false);
      navigate("/liveBattleResults", { state: { battleId } });
    }

    if (
      liveBattle &&
      liveBattle.category1 &&
      liveBattle.category2 &&
      !liveBattle.quiz
    ) {
      const category =
        Math.random() < 0.5
          ? liveBattle.category1.value
          : liveBattle.category2.value;

      getQuizQuestions(category, "medium", 6).then((data) => {
        addQuizToLiveBattle(battleId, "Live Battle", data);
      });
    }

    if (liveBattle && liveBattle.quiz) {
      setQuiz(liveBattle.quiz);
      setQuestions(Object.values(liveBattle.quiz.questions));
      setCategoriesView(false);
      setLoading(false);
    }
  }, [liveBattle]);

  useEffect(() => {
    if (questions.length > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prevSec) => {
          if (prevSec > 0) {
            return prevSec - 1;
          } else {
            setSecondsLeft(10);
            setIndex((prev) => prev + 0.5);
          }
        });
      }, 300);

      return () => clearInterval(timer);
    }
  }, [questions]);

  useEffect(() => {
    if (questions.length === index + 1 && secondsLeft <= 1) {
      setLoading(true);
      if (userData.username === liveBattle.player1) {
        updateLiveBattle(battleId, "player1Score", points).then(() => {
          if (liveBattle.player2Score || liveBattle.player2Score === 0) {
            navigate("/liveBattleResults", { state: { battleId } });
          }
        });
      } else {
        updateLiveBattle(battleId, "player2Score", points).then(() => {
          if (liveBattle.player1Score || liveBattle.player1Score === 0) {
            navigate("/liveBattleResults", { state: { battleId } });
          }
        });
      }
    }
  }, [index, secondsLeft]);

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

  const handleClick = (question, answer, index) => {
    setSelectedItem({ ...selectedItem, [index]: question });
    setButtonColor("rgb(3,165,251)");

    if (question === answer) {
      setPoints(points + 1);
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
              );
            })}
          </Box>
          <Button
            variant="contained"
            sx={{
              width: "110px",
              height: "45px",
              marginTop: "40px",
              marginLeft: "15px",
              backgroundColor: "rgb(3,165,251)",
              color: "white",
              fontSize: "20px",
            }}
            onClick={() => handleSubmitCategory(chosenCategory)}
          >
            Select
          </Button>
          <LiveBattleLoading
            open={loading}
            text1={"We are creating the quiz for your battle"}
            text2={
              "Please wait while we prepare your quiz. This may take a few seconds."
            }
          />
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "100px",
            minWidth: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Typography
            style={{
              color: "#394E6A",
              fontFamily: "Fantasy",
              marginTop: "30px",
              marginBottom: "5px",
              fontSize: "25px",
            }}
          >
            {quiz.title} Quiz
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              fontFamily: "cursive",
              color: "#394E6A",
              fontSize: "17px",
              minWidth: "45%",
              marginBottom: "5px",
            }}
          >
            {" "}
            Time left: {secondsLeft}
          </Typography>
          <Box
            sx={{
              boxShadow: 4,
              width: "45%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <span
              style={{
                color: "#394E6A",
                fontFamily: "Fantasy",
                marginBottom: "10px",
              }}
            >
              Question
              <span style={{ fontSize: "23px", marginLeft: "7px" }}>
                {index + 1}
              </span>{" "}
              / {length}
            </span>
            <Typography
              style={{
                fontFamily: "fantasy",
                color: "#394E6A",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
              }}
              variant="h5"
            >
              {questions[index]?.title}
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {questions[index]?.answers?.map((question) => {
                return (
                  <Grid key={question} item xs={6}>
                    <Item
                      sx={{
                        fontFamily: "Monospace",
                        cursor: "pointer",
                        backgroundColor:
                          selectedItem[index] === question
                            ? "rgb(3,165,251)"
                            : "initial",
                        color:
                          selectedItem[index] === question
                            ? "#ffffff"
                            : theme.palette.text.secondary,
                        "&:hover": {
                          backgroundColor:
                            selectedItem[index] === question
                              ? buttonColor
                              : "#EBECF0",
                        },
                        transition: "transform 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.03)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      onClick={() =>
                        handleClick(
                          question,
                          questions[index].correctAnswer,
                          index
                        )
                      }
                    >
                      {question}
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <LiveBattleLoading
            open={loading}
            text1={"The results are being processed!"}
          />
        </Box>
      )}
    </>
  );
};

export default LiveBattle;
