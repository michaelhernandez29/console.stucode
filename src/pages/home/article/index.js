import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  return (
    <Link
      to={`/article/${article.id}`}
      style={{
        textDecoration: "none",
        flexGrow: 1,
      }}
    >
      <Card
        style={{
          textDecoration: "none",
        }}
      >
        <CardMedia src={article.image} title={article.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default Article;
