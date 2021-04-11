import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { FeedContext } from "../context/FeedContext";
import authHeader from "../services/header";
import http from "../services/http";

const DeletePost = ({ postId, closeModal, goToHome }) => {
  const { feed, setFeed } = useContext(FeedContext);
  const history = useHistory();

  const handleDeletePost = () => {
    closeModal();

    if (goToHome) {
      history.push(`/`);
    }

    setFeed(feed.filter((post) => post.id !== postId));
    toast.success("Your post has been deleted successfully");
    http.delete(`post/${postId}`, { headers: authHeader() });
  };

  return (
    <span className="danger" onClick={handleDeletePost}>
      Delete Post
    </span>
  );
};

export default DeletePost;
