import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Paper, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchBooks } from "../api/bookService";
import { generateBookCoverImage } from "../api/openaiService";
// const sampleBooks = [
//     {
//         id: 1,
//         title: "리액트를 다루는 기술",
//         category: "프로그래밍",
//         createdAt: "2025-05-30",
//     },
//     {
//         id: 2,
//         title: "자바의 정석",
//         category: "프로그래밍",
//         createdAt: "2025-05-28",
//     },
//     {id: 3, title: "불편한 편의점", category: "소설", createdAt: "2025-05-25"},
//     {id: 4, title: "해리포터", category: "판타지", createdAt: "2025-05-22"},
// ];

const categoryMap = {
  NOVEL: "소설",
  POETRY_ESSAY: "시/에세이",
  HUMANITIES: "인문",
  FAMILY_PARENTING: "가정/육아",
  HOBBY: "취미",
  SELF_IMPROVEMENT: "자기계발",
  ECONOMY_BUSINESS: "경제/경영",
  SOCIETY: "정치/사회",
  HISTORY_CULTURE: "역사/문화",
  RELIGION: "종교",
  ART_POP_CULTURE: "예술/대중문화",
  TECHNOLOGY_ENGINEERING: "기술/공학",
  SCIENCE: "과학",
  TRAVEL: "여행",
};

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
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                {/* 이미지 */}
                <Box
                  component="img"
                  src={book.bookCoverUrl || "/default-cover.jpg"}
                  alt={book.title}
                  loading="lazy"
                  sx={{
                    width: 200,
                    height: 280,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 2,
                    marginRight: 3, // ← 이미지와 텍스트 사이 간격 증가
                  }}
                />

                {/* 책 정보 */}
                <div>
                  <h3 style={{ margin: "0 0 5px 0" }}>{book.title}</h3>
                  <p style={{ margin: 0 }}>
                    카테고리: {categoryMap[book.category] || book.category}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9em", color: "#555" }}>
                    등록일: {book.createdAt}
                  </p>
                </div>
              </div>

              {/* 보기 버튼 (MUI 사용) */}
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/book/${book.id}`}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                  },
                }}
              >
                보기
              </Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
};
