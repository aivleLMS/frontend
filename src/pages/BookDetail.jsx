import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const sampleBooks = [
  {
    id: 1,
    title: "리액트를 다루는 기술",
    category: "프로그래밍",
    createdAt: "2025-05-30",
  },
  {
    id: 2,
    title: "자바의 정석",
    category: "프로그래밍",
    createdAt: "2025-05-28",
  },
  { id: 3, title: "불편한 편의점", category: "소설", createdAt: "2025-05-25" },
  { id: 4, title: "해리포터", category: "판타지", createdAt: "2025-05-22" },
];

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imgurl =
    "data:image/jpeg;base64,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";

  // 문자열로 들어오는 id를 숫자로 변환해서 찾기
  const book = sampleBooks.find((b) => b.id === parseInt(id));

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
            src={imgurl}
            alt={book.title}
            sx={{ borderRadius: 2, boxShadow: 2 }}
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
              value={book.category}
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
              value={book.createdAt}
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
              value="서버에서 불러올 예정입니다."
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
            onClick={() => navigate("/edit")}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => navigate("/book")}
          >
            삭제
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookDetail;
