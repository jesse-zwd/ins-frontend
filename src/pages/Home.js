import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Suggestions from "../components/Suggestions";
import NoFeedSuggestions from "../components/NoFeedSuggestions";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { FeedContext } from "../context/FeedContext";
import http from "../services/http";
import authHeader from "../services/header";

const Wrapper = styled.div`
  @media screen and (max-width: 1040px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Home = () => {
  const { feed, setFeed } = useContext(FeedContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get(`feed/`, { headers: authHeader() }).then((res) => {
      setFeed(res.data);
      setLoading(false);
    })
  }, [setFeed]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {feed.length > 0 ? (
        <>
          <div className="home">
            {feed.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
          <Suggestions />{" "}
        </>
      ) : (
        <NoFeedSuggestions />
      )}
    </Wrapper>
  );
};

export default Home;
