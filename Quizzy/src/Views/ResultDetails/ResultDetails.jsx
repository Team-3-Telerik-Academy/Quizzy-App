import { Box, Typography, Paper } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

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

const ResultDetails = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#F3F4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontFamily: "fantasy", color: "#394E6A", marginTop: "20px" }}
      >
        Detailed Analysis of your results:
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontFamily: "fantasy", color: "rgb(3,165,251)" }}
          >
            Correct Answers
          </Typography>
          <Box
            sx={{
              boxShadow: "4",
              width: "auto",
              height: "auto",
              display: "flex",
              alignItems: "center",
              fontFamily: "fantasy",
              backgroundColor: "white",
              gap: "5px",
              borderRadius: "15px",
              padding: "10px",
            }}
          >//// map thru the answers</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultDetails;
