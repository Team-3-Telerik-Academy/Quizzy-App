import { Box, Button, Typography } from "@mui/material";

const EducatorGroups = () => {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Typography
        variant="h3"
        sx={{
          marginLeft: "50px",
          fontFamily: "fantasy",
          color: "rgb(57, 78, 106)",
          display: "flex",
        //   justifyContent: "flex-start",
        //   width: "100%",
        }}
      >
        Educator Groups
      </Typography> */}
      <Box
        sx={{
          width: "41%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "fantasy",
            color: "rgb(57, 78, 106)",
            display: "flex",
          }}
        >
          Educator Groups
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: "115px",
            height: "40px",
            fontSize: "10px",
            backgroundColor: "rgb(3,165,251)",
            color: "white",
          }}
        >
          Create Group
        </Button>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "600px",
            height: "auto",
            boxShadow: "4",
            borderRadius: "5px",
            fontFamily: "Poppins",
            fontSize: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              borderBottom: "3px solid #f3f4f6",
              padding: "5px 0px 5px 0px",
            }}
          >
            <span style={{ width: "50%", padding: "0px 0px 0px 5px" }}>
              Name
            </span>
            <span style={{ width: "50%", padding: "0px 0px 0px 5px" }}>
              Educators
            </span>
          </Box>
          //loop thru groups
        </Box>
      </Box>
    </Box>
  );
};

export default EducatorGroups;
