import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Article = ({ article }) => {
  const limitedContent =
    article.content.length > 500
      ? article.content.substring(0, 500) + "..."
      : article.content;

  return (
    <Link
      to={`/articles/${article.id}`}
      style={{
        textDecoration: "none",
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
        <Box sx={{ display: "flex", flexDirection: "column", border: "none" }}>
          <CardContent>
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
        </Box>
        <CardMedia
          component="img"
          src={article.image}
          title={article.image}
          style={{ width: "20%", objectFit: "cover" }}
        />
      </Card>
    </Link>
  );
};

export default Article;
