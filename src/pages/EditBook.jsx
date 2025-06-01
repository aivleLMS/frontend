import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {fetchBookById, updateBook, deleteBook} from "../api/bookService";
import {generateBookCoverImage} from "../api/openaiService";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";

const categoryOptions = [
  {label: "소설", value: "NOVEL"},
  {label: "시/에세이", value: "POETRY_ESSAY"},
  {label: "인문", value: "HUMANITIES"},
  {label: "가정/육아", value: "FAMILY_PARENTING"},
  {label: "취미", value: "HOBBY"},
  {label: "자기계발", value: "SELF_IMPROVEMENT"},
  {label: "경제/경영", value: "ECONOMY_BUSINESS"},
  {label: "정치/사회", value: "SOCIETY"},
  {label: "역사/문화", value: "HISTORY_CULTURE"},
  {label: "종교", value: "RELIGION"},
  {label: "예술/대중문화", value: "ART_POP_CULTURE"},
  {label: "기술/공학", value: "TECHNOLOGY_ENGINEERING"},
  {label: "과학", value: "SCIENCE"},
  {label: "여행", value: "TRAVEL"},
];

// 상태 변수들: 입력값을 관리
function EditBook() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [category, setCategory] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookById(id)
      .then((book) => {
        setTitle(book.title || "");
        setStory(book.story || "");
        setCategory(book.category || "");
        setCoverUrl(book.bookCoverUrl || "");
      })
      .catch((err) => {
        console.error("도서 정보 불러오기 실패", err);
        alert("도서를 불러오지 못했습니다.");
      });
  }, [id]);


  // 도서 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !story || !category) {
      alert("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }

    const updatedBook = {
      id,
      title,
      story,
      category,
      bookCoverUrl: coverUrl,
      userId: localStorage.getItem("username"),
    };

    try {
      await updateBook(id, updatedBook);
      alert("도서가 수정되었습니다.");
      navigate("/book");
    } catch (err) {
      console.error("수정 실패", err);
      alert("도서 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 이 도서를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteBook(id);  // deleteBook 함수는 별도 작성 필요
      alert("삭제가 완료되었습니다.");
      navigate("/book");
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // AI 표지 재생성
  const handleGenerateCover = async () => {
    if (!title || !story) {
      alert("도서 제목과 내용을 먼저 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const apiKey = localStorage.getItem("token");
      if (!apiKey) {
        alert("API 키가 저장되어 있지 않습니다. 로그인 후 다시 시도해주세요.");
        return;
      }
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
        sx={{maxWidth: 800, mx: "auto", p: 4, borderRadius: 4}}
      >
        {/*뒤로가기버튼*/}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon/>}
          onClick={() => navigate("/book")} // 이전 페이지로 이동
          sx={{mb: 2}}
        >
          뒤로가기
        </Button>
        {/* 폼 내용 전체 */}
        <Box component="form" onSubmit={handleSubmit} sx={{px: 2, py: 3}}>
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
            <Box sx={{flex: 1, minWidth: "250px"}}>
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
            <Box sx={{minWidth: "200px"}}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                카테고리
              </Typography>
              <TextField
                select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                SelectProps={{native: true}}
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
                <option value="">카테고리 선택</option>
                {categoryOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* 내용 */}
          <Box sx={{mb: 3}}>
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
          <Box sx={{my: 3, textAlign: "center"}}>
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
            sx={{display: "flex", gap: 2, justifyContent: "center", mt: 4}}
          >
            <Button
              variant="contained"
              startIcon={<ReplayCircleFilledIcon/>}
              onClick={handleGenerateCover}
            >
              AI 표지 재생성
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon/>}
              type="submit"
            >
              수정
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon/>}
              onClick={handleDelete}
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
