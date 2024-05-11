import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from "@mui/material";

import Article from "./article/index.js";
import ArticleService from "../../services/articleService.js";
import Filters from "../../constants/filters";
import MainLayout from "../../components/mainlayout/index.js";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(Filters.LIMIT);
  const [page, setPage] = useState(Filters.PAGE);
  const [pageCount, setPageCount] = useState(0);
  const [find, setFind] = useState("");
  const [sort, setSort] = useState("a-z");

  useEffect(() => {
    const fetchData = async () => {
      let query = `?limit=${limit}&page=${page}&orderBy=${sort}`;
      if (find) {
        query += `&find=${find}`;
      }

      const articles = await ArticleService.findAll(query);
      setArticles(articles.data);
      setPageCount(articles.count);
    };

    fetchData();
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
          marginBottom: 2,
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
            <MenuItem value="updated-at-asc">Más antiguos</MenuItem>
            <MenuItem value="updated-at-desc">Más recientes</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
    </MainLayout>
  );
};

export default Home;
