import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import CreatePost from "./pages/CreatePost";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";

function App() {
  return (
    <>
      <div className="navbar">
        <div className="links">
          <a href="/">Home</a>
          <a href="/mainpage">Main Page</a>
          <a href="/createpost">Create Post</a>
        </div>
      </div>

      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:postId" element={<Post />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
