import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";

import Article from "../../home/article/index.js";
import ArticleService from "../../../services/articleService.js";
import UserService from "../../../services/userService.js";
import Filters from "../../../constants/filters.js";
import MainLayout from "../../../components/mainlayout/index.js";

const UserArticles = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(Filters.LIMIT);
  const [page, setPage] = useState(Filters.PAGE);
  const [pageCount, setPageCount] = useState(0);
  const [find, setFind] = useState("");
  const [sort, setSort] = useState("a-z");

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await UserService.findById(id);
      setUser(userResponse.data);

      let query = `?userId=${userResponse.data.id}&limit=${limit}&page=${page}&orderBy=${sort}`;
      if (find) {
        query += `&find=${find}`;
      }

      const articlesResponse = await ArticleService.findAll(query);
      setArticles(articlesResponse.data);
      setPageCount(articlesResponse.count);
    };

    fetchData();
  }, [id, find, limit, page, sort]);

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
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
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
              label="Ordenar por"
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value="a-z">A-Z</MenuItem>
              <MenuItem value="z-a">Z-A</MenuItem>
              <MenuItem value="updated-at-asc">Más antiguos</MenuItem>
              <MenuItem value="updated-at-desc">Más recientes</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h4" gutterBottom align="left">
          Artículos de {user.name}
        </Typography>
        <List>
          {articles.map((article) => (
            <Article key={article.id} article={article} />
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
      </Box>
    </MainLayout>
  );
};

export default UserArticles;
