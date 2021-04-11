import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import NoResults from "../components/NoResults";
import Loader from "../components/PostPreview";
import authHeader from "../services/header";
import http from "../services/http";

const SearchResults = () => {
  const { searchterm } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => { 
    http.get(`postsearch/?search=${searchterm}`, {headers: authHeader()}).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [searchterm]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !posts.length) {
    return <NoResults title="No results found" text="Try different keywords" />;
  }

  return (
    <>
      <div style={{ marginTop: "2.3rem" }}>
        <h2>Search Results</h2>
        <PostPreview posts={posts} />
      </div>
    </>
  );
};

export default SearchResults;
