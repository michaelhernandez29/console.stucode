import React, { Fragment, useEffect, useState } from "react";
import { List, TablePagination, TextField } from "@mui/material";

import ArticleService from "../../services/articleService.js";
import Article from "./article/index.js";
import Filters from "../../constants/filters";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(Filters.LIMIT);
  const [page, setPage] = useState(Filters.PAGE);
  const [pageCount, setPageCount] = useState(0);
  const [find, setFind] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const query = find ? `?find=${find}` : `?limit=${limit}&page=${page}`;

      const articles = await ArticleService.findAll(query);
      setArticles(articles.data);
      setPageCount(articles.count);
    };

    fetchData();
  }, [limit, page, find]);

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

  return (
    <Fragment>
      <TextField variant="outlined" value={find} onChange={handleSearchFind} />
      <List
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {articles.map((article) => (
          <Article article={article} />
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

export default Home;
