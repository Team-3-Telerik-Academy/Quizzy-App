import { Box, Button, Pagination, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { getAllGroups } from "../../services/groups.services";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";

const EducatorGroups = () => {
  const [groups, setGroups] = useState([]);
  const [groupsOnPage, setGroupsOnPage] = useState(null);
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("educatorGroupsPage")) || 1
  );
  const [numberOfPages, setNumberOfPages] = useState(1);
  const number = 6;
  const navigate = useNavigate();

  const { userData } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("educatorGroupsPage", page);
  }, [page]);

  useEffect(() => {
    getAllGroups()
      .then((groups) => {
        return Object.entries(groups).map(([id, value]) => ({ id, ...value }));
      })
      .then((groupsArray) => {
        return groupsArray.filter((group) => {
          return Object.keys(group.members).includes(userData?.username);
        });
      })
      .then((result) => setGroups(result));
  }, [userData]);

  useEffect(() => {
    if (groups.length) {
      setNumberOfPages(Math.ceil(groups.length / number));
      setGroupsOnPage(groups.slice((page - 1) * number, page * number));
    }
  }, [groups]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setGroupsOnPage(groups.slice((value - 1) * number, value * number));
  };

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
      {groups.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
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

            {groupsOnPage?.map((group) => {
              return (
                <Box
                  key={group.id}
                  sx={{
                    display: "flex",
                    padding: "10px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                  onClick={() => navigate(`/groupDetails/${group.id}`)}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
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
                  <span
                    style={{
                      marginLeft: "10px",
                      fontWeight: "700",
                      color: "rgb(57, 78, 106)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {Object.keys(group.members).length}
                  </span>
                </Box>
              );
            })}
          </Box>
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "rgb(0, 165, 251)",
                color: "white",
              },
            }}
          />
        </Box>
      ) : (
        <Typography
          style={{
            fontFamily: "fantasy",
            alignItems: "center",
            fontSize: "27px",
            display: "flex",
            justifyContent: "center",
            height: "40vh",
          }}
        >
          No groups found
        </Typography>
      )}
    </Box>
  );
};

export default EducatorGroups;
