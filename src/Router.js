import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages, components, styles
import Nav from "./components/Nav";
import Container from "./styles/Container";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import DetailedPost from "./pages/DetailedPost";
import EditProfile from "./pages/EditProfile";
import SearchResults from "./pages/SearchResults";

const AppRouter = () => {
  return (
    <Router>
      <Nav />
      <Container>
        <Switch>
          <Route path="/explore" component={Explore} />
          <Route path="/p/:postId" component={DetailedPost} />
          <Route path="/results/:searchterm" component={SearchResults} />
          <Route path="/accounts/edit" component={EditProfile} />
          <Route path="/:id" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </Router>
  );
};

export default AppRouter;
