import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchBookById, deleteBook } from "../api/bookService";

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

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookById(id)
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("도서 정보 불러오기 실패", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteBook(id);
        alert("도서가 삭제되었습니다.");
        navigate("/book");
      } catch (error) {
        console.error("삭제 실패", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <div>📚 도서 정보를 불러오는 중입니다...</div>;
  if (!book) return <div>❌ 도서를 찾을 수 없습니다.</div>;

  // 이 부분은 추후 실제 DB나 상태에서 가져오도록 구현
  return (
    <Box
      sx={{
        background: "#f0f4f8",
        backgroundImage: `radial-gradient(#d1e3f8 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        minHeight: "100vh",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 4 }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => navigate(-1)} // 이전 페이지로 이동
          sx={{ mb: 2 }}
        >
          뒤로가기
        </Button>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          도서 상세 보기
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            mb: 4,
            alignItems: "flex-start",
          }}
        >
          {/* 표지 이미지 */}
          <Box
            component="img"
            src={book.bookCoverUrl || "/default-cover.jpg"}
            alt={book.title}
            sx={{
              width: 200,
              height: 280,
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
          {/* 텍스트 정보 */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="제목"
              value={book.title}
              variant="outlined"
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderWidth: 1.5,
                  },
                },
              }}
            />
            <TextField
              label="카테고리"
              value={categoryMap[book.category]}
              variant="outlined"
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderWidth: 1.5,
                  },
                },
              }}
            />
            <TextField
              label="작성일"
              value={book.createDate ? new Date(book.createDate).toLocaleString("ko-KR") : "작성일 없음"}
              variant="outlined"
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderWidth: 1.5,
                  },
                },
              }}
            />
            <TextField
              label="내용"
              value={book.story || ""}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderWidth: 1.5,
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            type="submit"
            onClick={() => navigate(`/edit/${book.id}`)}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            삭제
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookDetail;
