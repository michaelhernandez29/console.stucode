import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const User = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
      <ListItem
        key={user.id}
        sx={{
          border: "1px solid transparent",
          transition: "border-color 0.3s",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.logo} />
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                color="text.primary"
                component="span"
                variant="body2"
              >
                {user.email}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </Link>
  );
};

export default User;
