import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";

import UserService from "../../services/userService";
import User from "../users/user/index.js";
import Filters from "../../constants/filters.js";
import MainLayout from "../../components/mainlayout/index.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.js";

const Followers = () => {
  const { id } = useParams();
  const { userId } = useAuth();
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(Filters.LIMIT);
  const [page, setPage] = useState(Filters.PAGE);
  const [pageCount, setPageCount] = useState(0);
  const [find, setFind] = useState("");
  const [sort, setSort] = useState("a-z");

  useEffect(() => {
    const fetchUsers = async () => {
      const encodedFind = encodeURIComponent(find);
      let query = `?limit=${limit}&page=${page}&orderBy=${sort}`;
      if (find) {
        query += `&find=${encodedFind}`;
      }
      let users = await UserService.findAll(query);
      const updatedUsers = await Promise.all(
        users.data
          .filter((user) =>
            user.followers.includes(Number.parseInt(userId, 10)),
          )
          .map(async (user) => {
            const followerData = await UserService.findById(
              Number.parseInt(userId, 10),
            );
            return followerData.data;
          }),
      );

      setUsers(updatedUsers);
      setPageCount(updatedUsers.length);
    };

    fetchUsers();
  }, [find, limit, page, sort, id, userId]);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(parseInt(newPage, 10));
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(0);
  };

  const handleSearchFind = (event) => {
    setFind(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <TextField
            variant="standard"
            value={find}
            onChange={handleSearchFind}
            size="normal"
            placeholder="Buscar..."
            label="Buscar"
          />
          <FormControl variant="standard" sx={{ width: "200px" }}>
            <InputLabel id="order-by">Ordenar por</InputLabel>
            <Select
              labelId="order-by"
              id="order-by"
              label="Order by"
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value="a-z">A-Z</MenuItem>
              <MenuItem value="z-a">Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {users.length === 0 ? (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">No se han encontrado usuarios</Typography>
          </Box>
        ) : (
          <List sx={{ flexGrow: 1 }}>
            {users.map((user) => (
              <Fragment key={user.id}>
                <User user={user} />
                <Divider variant="inset" component="li" />
              </Fragment>
            ))}
          </List>
        )}

        <Box
          sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <TablePagination
            component="div"
            count={pageCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Resultados por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
            }
          />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Followers;
