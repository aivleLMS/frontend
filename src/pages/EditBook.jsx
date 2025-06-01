import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateBook } from "../api/bookService";
import {Button,Paper,TextField,Typography,Box,FormControl,InputLabel,Select,Menu} from "@mui/material"
import DeleteIcon from"@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { generateBookCoverImage } from "../api/openaiService";

import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
  // 상태 변수들: 입력값을 관리
  function EditBook(){
const [id, setId] = useState("");
const [title, setTitle] = useState("");
const [story, setStory] = useState("");
const [category, setCategory] = useState("");
const [coverUrl, setCoverUrl] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();


  // 도서 등록 버튼 눌렀을 때 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      id,
      title,
      story,
      category,
      bookCoverUrl: coverUrl,
      createDate: new Date().toISOString(),
      lastUpdateDate: new Date().toISOString(),
      userId: 1, // 실제 로그인 기능이 붙으면 여기 변경해야 함
    };

// AI 표지 생성 버튼 눌렀을 때 실행
const handleGenerateCover = async () => {
    if (!title || !story) {
      alert("도서 제목과 내용을 먼저 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      const prompt = `다음 설명을 바탕으로 한 도서 표지 일러스트를 그려주세요.\n제목: ${title}\n내용: ${story}`;
      const imageUrl = await generateBookCoverImage(apiKey, prompt);
      setCoverUrl(imageUrl);
    } catch (error) {
      alert("표지 생성 실패: " + error.message);
    } finally {
      setLoading(false);

    }
  };

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
        {/*뒤로가기버튼*/}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => navigate("/book")} // 이전 페이지로 이동
          sx={{ mb: 2 }}
        >
          뒤로가기
        </Button>
        {/* 폼 내용 전체 */}
        <Box component="form" onSubmit={handleSubmit} sx={{ px: 2, py: 3 }}>
          {/* 헤더 */}
          <Typography variant="h5" fontWeight="bold" mb={3}>
            📘 도서 수정
          </Typography>

          {/* 제목 & 카테고리 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            {/* 제목 */}
            <Box sx={{ flex: 1, minWidth: "250px" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                제목
              </Typography>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                placeholder="도서 제목을 입력하세요"
                variant="outlined"
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

            {/* 카테고리 */}
            <Box sx={{ minWidth: "200px" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                카테고리
              </Typography>
              <TextField
                select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                SelectProps={{ native: true }}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": {
                      borderWidth: 1.5,
                    },
                  },
                }}
              >
                <option value="소설">소설</option>
                <option value="에세이">에세이</option>
                <option value="시">시</option>
                <option value="자기계발">자기계발</option>
                <option value="과학">과학</option>
                <option value="역사">역사</option>
                <option value="여행">여행</option>
                <option value="IT">IT</option>
                <option value="철학">철학</option>
                <option value="기타">기타</option>
              </TextField>
            </Box>
          </Box>

          {/* 내용 */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="Black"
              mb={1}
            >
              내용
            </Typography>
            <TextField
              value={story}
              onChange={(e) => setStory(e.target.value)}
              multiline
              rows={5}
              fullWidth
              required
              placeholder="내용을 입력해주세요..."
              variant="outlined"
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

          {/* 표지 이미지 미리보기 */}
          <Box sx={{ my: 3, textAlign: "center" }}>
            <img
              src={coverUrl}
              alt="도서 표지"
              style={{
                width: "200px",
                height: "auto",
                borderRadius: "8px",
                border: "2px solid #ccc",
              }}
            />
          </Box>

          {/* 버튼 영역 */}
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}
          >
            <Button
              variant="contained"
              startIcon={<ReplayCircleFilledIcon />}
              onClick={handleGenerateCover}
            >
              AI 표지 재생성
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon />}
              type="submit"
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
        </Box>
      </Paper>
    </Box>
  );
}

export default EditBook;
