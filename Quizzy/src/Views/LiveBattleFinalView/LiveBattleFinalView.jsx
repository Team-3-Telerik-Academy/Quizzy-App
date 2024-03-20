import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import background from ".//..//..//Images/quiz-battle-home-pic.jpg";

const FullScreenContainer = styled(Container)({
  backgroundImage: `url(${background})`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const LiveBattleFinalView = () => {
  const player1 = { name: "Player 1", image: "player1.jpg", points: 10 };
  const player2 = { name: "Player 2", image: "player2.jpg", points: 8 };

  return (
    <FullScreenContainer maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom>
        Results of the Live Battle
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <img
                  src={player1.image}
                  alt={player1.name}
                  style={{ width: "100px" }}
                />
              </TableCell>
              <TableCell>{player1.name}</TableCell>
              <TableCell>{player1.points}</TableCell>
              <TableCell>
                <img
                  src={player2.image}
                  alt={player2.name}
                  style={{ width: "100px" }}
                />
              </TableCell>
              <TableCell>{player2.name}</TableCell>
              <TableCell>{player2.points}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth>
              Go Home
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="secondary" fullWidth>
              Start One More Battle
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FullScreenContainer>
  );
};

export default LiveBattleFinalView;
