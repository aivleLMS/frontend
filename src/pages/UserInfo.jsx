import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();

  // localStorage에서 유저 정보 불러오기
  const username = localStorage.getItem("username") || "익명";
  const token = localStorage.getItem("token") || "";

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        👤 사용자 정보
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        사용자 이름: <strong>{username}</strong>
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        API Key: <code>{token.slice(0, 6) + "••••••"}</code>
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 4 }}
      >
        로그아웃
      </Button>
    </Box>
  );
};

export default UserInfo;
