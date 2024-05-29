import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import defaultImage from "../../../assets/img/no_image_available.png";

const Article = ({ article }) => {
  const limitedContent =
    article.content.length > 200
      ? article.content.substring(0, 200) + "..."
      : article.content;

  return (
    <Link
      to={`/articles/${article.id}`}
      style={{
        textDecoration: "none",
        maxHeight: "250px",
        overflow: "hidden",
        display: "block",
      }}
    >
      <Card
        sx={{
          display: "flex",
          marginBottom: 2,
          border: "1px solid transparent",
          transition: "border-color 0.3s",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {article.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ marginTop: 1, marginBottom: 1 }}
          >
            {`${moment(article.updatedAt).format("LLLL")}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {limitedContent}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          src={article.image || defaultImage}
          title={article.image}
          sx={{
            width: "20%",
            position: "relative",
            "& img": {
              maxWidth: "100%",
              maxHeight: "100%",
              width: "640px",
              height: "480px",
              objectFit: "cover",
            },
          }}
        />
      </Card>
    </Link>
  );
};

export default Article;
