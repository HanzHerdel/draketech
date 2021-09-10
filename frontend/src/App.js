import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Admin from "./components/Admin.js";
import PostForm from "./components/PostForm.js";
import "./App.css";
import { get } from "./utils/api.js";
import SingleView from "./components/SingleView.js";

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [posts, setPosts] = useState([]);
  async function fetchPosts() {
    const posts = await get("/api/posts");
    if (!posts.valid) return;
    const sortedData = sortPosts(posts.data);
    setPosts(sortedData);
    setIsFetching(false);
  }
  useEffect(() => {
    fetchPosts();
    //eslint-disable-next-line
  }, []);

  const sortPosts = (posts = []) => {
    return posts
      .map((data) => {
        return { ...data, parsedDate: new Date(data.creation_time) };
      })
      .sort((a, b) => b.parsedDate - a.parsedDate);
  };

  return (
    <Router>
      <Route path="/" exact>
        <Home isFetching={isFetching} posts={posts} />
      </Route>
      <Route path="/admin" exact>
        <Admin isFetching={isFetching} posts={posts} />
      </Route>
      <Route path="/:category/:title/:id" exact>
        {/* path="/:category/:title" */}
        <SingleView isFetching={isFetching} posts={posts} />
      </Route>
      <Route path="/post/:id?">
        <PostForm isFetching={isFetching} posts={posts} reload={fetchPosts} />
      </Route>
    </Router>
  );
}

export default App;
