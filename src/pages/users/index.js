import React, { Fragment, useEffect, useState } from "react";
import { Divider, List, TablePagination } from "@mui/material";

import UserService from "../../services/userService";
import User from "./user";
import Filters from "../../constants/filters";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(Filters.LIMIT);
  const [page, setPage] = useState(Filters.PAGE);
  const [pageCount, setPageCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(parseInt(newPage, 10));
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(0);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const query = `?limit=${limit}&page=${page}`;
      const users = await UserService.findAll(query);
      setUsers(users.data);
      console.log(users.count);
      setPageCount(users.count);
    };

    fetchUsers();
  }, [limit, page]);

  return (
    <Fragment>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {users.map((user) => (
          <Fragment>
            <User key={user.id} user={user} />
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
    </Fragment>
  );
};

export default Users;
