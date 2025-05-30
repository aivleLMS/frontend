import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookList } from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import RegisterBook from "./pages/RegisterBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/new" element={<RegisterBook />} />
        <Route path="/edit" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
