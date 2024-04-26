import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const User = ({ user }) => {
  return (
    <ListItem key={user.id}>
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
  );
};

export default User;
