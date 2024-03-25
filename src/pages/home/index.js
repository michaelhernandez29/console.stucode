import React, { useEffect, useState } from "react";

import Article from "../../components/article/index.js";
import MainLayout from "../../components/mainlayout/index.js";
import articleService from "../../services/articleService.js";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await articleService.findAll();
      setArticles(response.data);
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      {articles.map((article) => (
        <Article key={article.id} data={article} />
      ))}
    </MainLayout>
  );
};

export default Home;
