import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Alert from "@mui/material/Alert";

import {
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e); // 예시: 사용자 인증 없이 로그인 처리 (간단한 Mock 방식)

    // 사용자 정보 localStorage에 저장
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    setShowAlert(true); // Alert 표시
    setTimeout(() => navigate("/book"), 1200); // 1.2초 후 이동
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 10,
      }}
    >
      <Box sx={{ m: 2 }} maxWidth={"400px"}>
        <Typography variant="subtitle1">사용자 이름</Typography>
        <FormControl sx={{ my: 1 }} variant="outlined" fullWidth>
          <OutlinedInput
            id="username"
            endAdornment={<InputAdornment position="end">님</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          API key
        </Typography>
        <FormControl sx={{ my: 1 }} variant="outlined" fullWidth>
          <OutlinedInput
            id="token"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => setToken(e.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LoginIcon />}
          fullWidth
          onClick={handleLogin}
          sx={{ my: 3 }}
          disabled={!username || !token}
        >
          로그인
        </Button>
        {showAlert && (
          <Alert severity="success">{username}님, 안녕하세요👋🏻</Alert>
        )}
      </Box>
    </Box>
  );
};

export default Login;
