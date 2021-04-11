import React, { useEffect, useState } from "react";
import authHeader from "../services/header";
import http from "../services/http";
import { BookmarkIcon, FilledBookmarkIcon } from "./Icons";

const SavePost = ({ isSaved, postId }) => {
  const [savedState, setSaved] = useState(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleToggleSave = () => {
    if (savedState) {
      setSaved(false);
      http.delete(`save/${postId}/`, {headers: authHeader()});
    } else {
      setSaved(true);
      http.post(`save/`, {post: postId}, {headers: authHeader()});
    }
  };

  if (savedState) {
    return <FilledBookmarkIcon onClick={handleToggleSave} />;
  }

  if (!savedState) {
    return <BookmarkIcon onClick={handleToggleSave} />;
  }
};

export default SavePost;
