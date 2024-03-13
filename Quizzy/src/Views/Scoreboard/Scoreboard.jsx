import { useEffect, useState } from "react";
import { getAllUsersSortedByScore } from "../../services/users.service";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const Scoreboard = () => {
  const [users, setUsers] = useState(null);
  const [usersOnPage, setUsersOnPage] = useState(null);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const number = 5;
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsersSortedByScore().then(setUsers);
  }, []);

  useEffect(() => {
    if (users) {
      setNumberOfPages(Math.ceil(users.length / number));
      setUsersOnPage(users.slice((page - 1) * number, page * number));
    }
  }, [users]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setUsersOnPage(users.slice((value - 1) * number, value * number));
  };

  return (
    <>
      {users ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "30px",
            height: "90.2vh",
            overflow: "auto",
          }}
        >
          <h1 style={{ color: "#394E6A", fontFamily: "Fantasy" }}>
            Scoreboard
          </h1>
          <div
            style={{
              backgroundColor: "#F3F4F6",
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <TableContainer
              component={Paper}
              style={{
                width: "30%",
                border: "2px solid rgb(3, 165, 251)",
                marginTop: "40px",
              }}
            >
              <Table>
                <TableBody>
                  {usersOnPage?.map((user, index) => (
                    <TableRow
                      key={user.uid}
                      style={{
                        backgroundColor:
                          index === 0 ? "rgba(144, 238, 144, 1)" : "inherit",
                      }}
                    >
                      <TableCell
                        align="center"
                        style={{
                          borderRight: "1px solid #E0E0E0",
                        }}
                      >
                        <strong>{(page - 1) * number + (index + 1)}</strong>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <img
                          onClick={() => navigate(`/profile/${user.username}`)}
                          src={user.image}
                          alt={user.username}
                          style={{
                            cursor: "pointer",
                            height: "40px",
                            width: "40px",
                            borderRadius: "50%",
                          }}
                        />
                        <strong>
                          {user.firstName} {user.lastName}
                          <br />
                          <span style={{ color: "grey" }}>{user.username}</span>
                        </strong>
                      </TableCell>
                      <TableCell align="left">
                        <strong>{user.totalPoints}</strong>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Scoreboard;
