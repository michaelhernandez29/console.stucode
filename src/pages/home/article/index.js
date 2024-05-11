import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  const limitedContent =
    article.content.length > 500
      ? article.content.substring(0, 500) + "..."
      : article.content;

  return (
    <Link
      to={`/article/${article.id}`}
      style={{
        textDecoration: "none",
        flexGrow: 1,
        display: "block",
        maxHeight: "150px",
        overflow: "hidden",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {article.title}
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
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Card>
    </Link>
  );
};

export default Article;
