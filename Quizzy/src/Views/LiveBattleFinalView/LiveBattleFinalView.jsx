import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import background from ".//..//..//Images/live-battle-results.jpg";
import winner from ".//..//..//Images/winner.png";
import {
  deleteLiveBattle,
  getLiveBattleById,
} from "../../services/live-battle.services";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const FullScreenContainer = styled(Container)({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
  backgroundSize: "contain",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0",
});

const PlayerBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  margin: "10px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px white",
  "& img": {
    borderRadius: "50%",
  },
  width: "35%",
  gap: "20px",
});

const LiveBattleFinalView = () => {
  const location = useLocation();
  const battleId = location.state.battleId;
  const [sender, setSender] = useState(null);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getLiveBattleById(battleId).then((data) => {
      if (userData.username === data.player1) {
        setPlayer1({
          name: data.player1FullName,
          image: data.player1Image,
          points: data.player1Score,
        });
        setPlayer2({
          name: data.player2FullName,
          image: data.player2Image,
          points: data.player2Score,
        });
        setSender(data.player1);
      } else {
        setPlayer1({
          name: data.player1FullName,
          image: data.player1Image,
          points: data.player1Score,
        });
        setPlayer2({
          name: data.player2FullName,
          image: data.player2Image,
          points: data.player2Score,
        });
        setSender(data.player2);
      }
    });
  }, []);

  useEffect(() => {
    if (player1 && player2) {
      deleteLiveBattle(battleId, sender);
    }
  }, [player1, player2]);

  return (
    <>
      {player1 && player2 && (
        <FullScreenContainer maxWidth="100vw">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Fantasy",
              marginBottom: "70px",
            }}
          >
            Results of the Live Battle
          </Typography>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "white", fontFamily: "Fantasy" }}
          >
            {player1.points === player2.points
              ? "It's a Tie!"
              : "The winner is " +
                (player1.points > player2.points
                  ? player1.name
                  : player2.name) +
                "!"}
          </Typography>
          <Grid container justifyContent="center" style={{ gap: "10px" }}>
            <PlayerBox>
              <Typography
                variant="h4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {player1.points > player2.points && (
                  <img
                    src={winner}
                    alt="Winner"
                    style={{ height: "65px", width: "65px" }}
                  />
                )}
                <span style={{ marginLeft: "10px" }}>{player1.name}</span>
              </Typography>
              <img
                src={player1.image}
                alt={player1.name}
                style={{ width: "70px", height: "70px" }}
              />
              <Typography variant="h6">Points: {player1.points}</Typography>
            </PlayerBox>
            <PlayerBox>
              <Typography
                variant="h4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {player2.points > player1.points && (
                  <img
                    src={winner}
                    alt="Winner"
                    style={{ height: "65px", width: "65px" }}
                  />
                )}
                <span style={{ marginLeft: "10px" }}>{player2.name}</span>
              </Typography>
              <img
                src={player2.image}
                alt={player2.name}
                style={{ width: "70px", height: "70px" }}
              />
              <Typography variant="h6">Points: {player2.points}</Typography>
            </PlayerBox>
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            style={{ gap: "15px", marginTop: "40px" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontSize: "20px",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontSize: "20px",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
              onClick={() => navigate("/live-battle")}
            >
              Start New Battle
            </Button>
          </Box>
        </FullScreenContainer>
      )}
    </>
  );
};

export default LiveBattleFinalView;
