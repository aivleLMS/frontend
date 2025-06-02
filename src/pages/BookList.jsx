import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Paper, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchBooks } from "../api/bookService";

export const BookList = () => {
  const [books, setBooks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks()
      .then((data) => setBooks(data))
      .catch((error) => console.error("도서 목록 로드 실패", error));
  }, []);

  return (
    <Box
      sx={{
        background: "#f0f4f8",
        backgroundImage: `radial-gradient(#d1e3f8 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        minHeight: "100vh",
        py: 6,
        px: 10,
      }}
    >
      <Paper
        elevation={3}
        sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 4 }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/register")}
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
        >
          등록
        </Button>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          글 목록
        </Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {books.map((book) => (
            <li
              key={book.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "60px",
                    height: "80px",
                    backgroundColor: "#eee",
                    marginRight: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  이미지
                </div>
                <div>
                  <h3 style={{ margin: "0 0 5px 0" }}>{book.title}</h3>
                  <p style={{ margin: 0 }}>카테고리: {book.category}</p>
                  <p style={{ margin: 0, fontSize: "0.9em", color: "#555" }}>
                    등록일: {book.createdAt}
                  </p>
                </div>
              </div>

              <Link to={`/book/${book.id}`}>
                <button>보기</button>
              </Link>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
};
