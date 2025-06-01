import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookList } from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import RegisterBook from "./pages/RegisterBook";
import EditBook from "./pages/EditBook";
import Login from "./pages/Login";
import AppBar from "./components/AppBar";
import UserInfo from "./pages/UserInfo";

function App() {
  return (
    <Router>
      <AppBar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/book" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/register" element={<RegisterBook />} />
        <Route path="/edit" element={<EditBook />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
