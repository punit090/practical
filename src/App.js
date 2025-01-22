import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Page/User";
import BookmarkedUsers from "./Page/BookmarkedUsers";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/bookmarks" element={<BookmarkedUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
