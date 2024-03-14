import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { getAllGroups } from "../../services/groups.services";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";

const EducatorGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const { userData } = useContext(AppContext);

  useEffect(() => {
    getAllGroups()
      .then((groups) => {
        return Object.values(groups).filter((group) => {
          return group.email === userData.email;
        });
      })
      .then((result) => setGroups(result));
  }, []);

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
      <Box
        sx={{
          width: "600px",
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
          onClick={() => navigate("/createGroup")}
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
            <span
              style={{
                width: "50%",
                padding: "0px 0px 0px 5px",
                marginLeft: "17px",
                fontWeight: "700",
                color: "rgb(57, 78, 106)",
                fontSize: "18px",
              }}
            >
              Name
            </span>
            <span
              style={{
                width: "50%",
                padding: "0px 0px 0px 5px",
                fontWeight: "700",
                color: "rgb(57, 78, 106)",
                fontSize: "18px",
              }}
            >
              Educators
            </span>
          </Box>

          {groups.map((group) => {
            return (
              <Box
                key={group.createdOn}
                sx={{
                  display: "flex",
                  marginBottom: "15px",
                  marginLeft: "15px",
                  marginTop: "10px",
                  transition: "transform 0.3s",
                  cursor:'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(0.9)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={group.image}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontWeight: "700",
                      color: "rgb(3,165,251)",
                    }}
                  >
                    {group.title}
                  </span>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default EducatorGroups;
