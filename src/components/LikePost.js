import React, { useEffect, useState } from "react";
import { HeartIcon, FilledHeartIcon } from "./Icons";
import authHeader from "../services/header";
import http from "../services/http";

const LikePost = ({ isLiked, postId, incLikes, decLikes }) => {
  const [likedState, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleToggleLike = () => {
    if (likedState) {
      setLiked(false);
      decLikes();
      http.delete(`like/${postId}`, {headers: authHeader()});
    } else {
      setLiked(true);
      incLikes();
      http.post(`like/`, {post: postId}, {headers: authHeader()});
    }
  };

  if (likedState) {
    return <FilledHeartIcon onClick={handleToggleLike} />;
  }

  if (!likedState) {
    return <HeartIcon onClick={handleToggleLike} />;
  }
};

export default LikePost;
