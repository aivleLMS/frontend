import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateBook } from "../api/bookService";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
// 상태 변수들: 입력값을 관리
function EditBook() {
  const id = "";
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [category, setCategory] = useState("");
  const [coverUrl, setCoverUrl] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQEDBAYHAgj/xAA9EAABAwIDBQQGBwgDAAAAAAABAAIDBBEFEiEGEzFBUQcUYZEiMnGBodJUYoKSscHhFRYjNEJSctEkM0P/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQMEAgUG/8QAKBEAAgIBAwIFBQEAAAAAAAAAAAECAxEEEiExQQUTIlJhMkJRodE0/9oADAMBAAIRAxEAPwDr6Ii8U1hERAERUcbNJCkFmppKaqIFTBHKWg2D7EeSxJ6DDo4RTRxR0rZpWi1O0R5njgDlHQc1YbHXHFe+CmltkDMr6hgAbf1couLc78b87Ky2KWHFe7OZPM19Q2odOWEMvlI4htgNALE3Fhbir4xx9xw38ElE2ih7tTAxPLXHdZgHWe3U26HU+PFKmCiho2R1DWshzMY0ka3LhYX8XW81EYfQbuuZC+SrEkNW+YudTvDXgsIFpC0tt6XVX8XoK6Y1DxUOdFNPThsTSfRAlj1tytZxuNTfwFpcfVjcRn4JGrpaCoqAKyKCSWQXayQAl1vA9EZDR4a2SRjI6aI5WkMGVg1sDlGg1PFRVVBWftqlIFyIwN61j3NNs2W+vFpzE3I9cetyyK+krnCsc+cyQyBoZEP8m8uVtfbfXgocF7hkmUVT6x42VFQ+pYERFACIiAIiIAiIgCIiAIiIBysiIpAT80XiJ2ZpJ1Odw8igPaAW4IigBERAEREAREQBERAEREAREQBERAEREAXmNuVpB5uJ8yV6XhsjXPcwH0mgE++9vwKkHtERQAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAp1PQXWFhndbSdzY5jQcuW2nFxuPaXH9FnG3NYeHGYtk3rGx2/pa0gB2Z1zqBe/om48V3HoyH1MxERcEhERAEREAREQBERAEREAREQBERAEREBR3A2t71h0XfO8T99dGb5d21h0At0Wbry0PIqPw2COGepMVQ+cvDHFzteoGv2VZF8MjuSCIirJCIiAIiIAiIgCIiAIiIAiIgCIiAIiIArUNPFBfcsEYIsWtFhxJ/Mq6inICIigBERAEREAREQBERAEREB4mkZDE+WV4ZGwFznHgAOJUHgm2GDY3WOo6GocZ7EtbIws3gHEtvx9iju1PEHUWyzoGOLX1krYbj+3VzvgLe9cfpKmWiq4qqmcWTQvD2EG2o5L1dJ4fG+lzfXsZ7LdssH0giwMFxalxrDoq2ikD2PFnAcWO5tI5FZ68yUXGTi+xenlZCIi5JCIrdRUQ0sElRUyNihibmfI82DR1JUpN8IFwa8EXH9rtuKvHJu4YJvYqRzsgyHJLUE6AfVB6efRdRwKjdhmC0NFK/O+ngYx773u4DX43Wm7SyprUp9X2/pXGzc8Iz0RQG0mL1WFzwRxOpGsqgY43zvLMj+ZcdQBY8bcdOYvRCDm9qO5PCyT9wihNmMbdi1ExskE7ZY2Bskxb/CkcNHZXDQ6g8gptJwcHtl1EXlZCIi4JCIiAIiIDnfbMCMPwt3LfvFvs/ouWrqXbJFK6gwydusMcr2v8HOAyn4HzXLV9T4Z/mRhu+tk1srtJVbOV5ngG8p5ABNATYPHUdCOq3SXtWh/wDHB5T/AJzNH4ArRMAwGv2gqzT4ext2i75HmzGDxKmca7PsZwmjfV5oKuGMXf3cnM0dbEC/uTUVaSVmLOpEZWJcG00vapQPIFVhlVF1cxzXgfmpmn2/2anbc17ovCWJw/AFcRNuRHmprZzZnEtonSHD2xtjiNnyymzWnpexJKpu8O0sVufCOo3Tzg6liHaBs7Rx5oqt1VIeDIGH8TYBc12r2vr9o5N2+1PQtN2U7Te/i48z8AsDHcDr8AqxTYhGA5zczHsN2vHgVFk2F1dpdFp6vXDn5OZ2SfDN77KsC77icuLVDP8Aj0ZDY78HSn/Q/ELo+N4tLhOSZ1HvKIg72YSWMbuQI4a9etgrex9AzDdm6CnjFrxB7j1c7Un4rMxfDIcXojRVT5BA9zTI2N2XOAb5Sel7eS8XU6hW6huf0rg0whthwQWHbRxU1ZU/t2WSh37Y5mNqm5WR5i4ZQ71bWa3nqcymMTp8JLHYniUEEjYoC3evbnyxnUge3w/JYOG7MwYfi8lS3dy0roi1jJmZ5WOLr+ub3HG3MX58o3aTFa2mroKTEZaKippJS+JwidKZWt4D1mi5JaMth7bKNkZ2LymTlpeo2fC6GLDaFtLTPkfEHPe0yuzH0nFxF/esta5sczFG08wxStdJ3Z5p2027aDHlsQXOHEluU+/3rY1mui4zaZ3B5QREVR0EREARFpm2u3MeBP7lhghqa4f9geSWw6XGYCxvre1x4q2mmdstsOpzKSiuSx2vVW52cgpbXNTUt16Bozf6XI/YpnaHafFNohEMSfCI4rlkcEeVt+upJv77KGGvJfU6Kh01bGYbJbpZR2DskbCNl5HR2Mzqp4l66AZR7LfiVnz1uMfv7T0DYi7CXUpc/wDh+iTY3Oa3G9hbxXK9mNp6/ZueR9IGSQy23kEhOV3iLcD4qbxbtMxaupX09LTQ0WcEOkY8yPt9W4AHkV59uhud8pxWU+/4LVZHbg1PFWRxYtWxQWMLKmRsen9IcbfCy6NT1lfgeyGyxwOIvZU1DDVZY82bNq4Hpfr4LnVFU0kDJe+Ya2sc8eg51Q+Pdn7PH3rYtk9uqzZ+jNFLA2rpQSYwXZXRnmB1H6rbqqrJwSis4/ZVCSTNr7Y4YzglBNpvW1wYHW1ymN5Pxa1cnsXaAXcdLBT21W1VZtLOw1LGw00N91Ax1w0niSeZUHFI6KVkrQC5rg4e0G660dM6aNkuosknLKPojB4JKXCKKnnI3sULGv8AaBqFmLmGKdqcr4ntwvD2xyuAtNM6+V3P0f1Wv0+3+00M+9diAmbe5jlhZlPhoAR7l4y8M1FmZPCNPnwXB26yxZ8OpJ69ldPCJZ2ROhbnFw1pOthw15npotHwDtMiq6xlNi9I2lbI4NZPHJdoJ/uBFwPG66HbwWOym3Ty9SwyyMozXBhYbhVJhm/FGxzGTODizOS1thYBoPAWHAaWWalkVLbbyztLAREUYAREQGCKqS49XyXB9o3udtFiZcbk1UpJ+2URfTaKEYyeEYbGR6ycMpmVmJU1NIXNZLIGuLeI9iqi9BvgqN3OwWGfS6770fyKn7hYb9LrvvR/IqoqNzJxyVGwWG/S6777PkT9wsN+l1/32fIqop3MnBUbBYZb+brvvs+RV/cDC7fzVd99nyIihSYwc9qGCKomibezHvaCeNg6wXjlfmURao8o5PEptG72L6IgqZG08QuDaNup48FRFg1kIyxuRZU8dC53qTo3yTvUn1fJEWHya/ai7cx3qT6vknepPq+SInkV+1Dcx3qT6vkiInk1+1Dc/wAn/9k="
  );

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

    try {
      await updateBook(newBook);
      alert("도서가 등록되었습니다!");
      navigate("/book");
    } catch (err) {
      console.error("등록 실패", err);
    }
  };

  // AI 표지 생성 버튼 눌렀을 때 실행
  const handleGenerateCover = () => {
    setCoverUrl(
      "data:image/jpeg;base64,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"
    );
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
