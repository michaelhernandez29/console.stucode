import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Avatar, Card, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import userService from "../../services/userService.js";

const Article = ({ data }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.findById(data.userId);
      setUser(response.data);
    };

    fetchData();
  }, [data.userId]);

  console.log(user);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={user.name}
        subheader="September 14, 2016"
      />
    </Card>
  );
};

Article.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Article;
