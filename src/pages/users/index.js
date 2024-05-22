import React, { Fragment, useEffect, useState } from "react";
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
} from "@mui/material";

import UserService from "../../services/userService";
import User from "./user";
import Filters from "../../constants/filters";
import MainLayout from "../../components/mainlayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(Filters.LIMIT);
  const [page, setPage] = useState(Filters.PAGE);
  const [pageCount, setPageCount] = useState(0);
  const [find, setFind] = useState("");
  const [sort, setSort] = useState("a-z");

  useEffect(() => {
    const fetchUsers = async () => {
      let query = `?limit=${limit}&page=${page}&orderBy=${sort}`;
      if (find) {
        query += `&find=${find}`;
      }
      const users = await UserService.findAll(query);
      setUsers(users.data);
      setPageCount(users.count);
    };

    fetchUsers();
  }, [find, limit, page, sort]);

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
      <List>
        {users.map((user) => (
          <Fragment key={user.id}>
            <User user={user} />
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      <TablePagination
        component="div"
        count={pageCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainLayout>
  );
};

export default Users;
