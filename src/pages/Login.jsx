import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e); // 예시: 사용자 인증 없이 로그인 처리 (간단한 Mock 방식)

    // 사용자 정보 localStorage에 저장
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    alert(`${username}님, 환영합니다!`);
    navigate("/book"); // 로그인 후 도서 목록으로 이동
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "40px" }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>사용자 이름:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
          <label>API key:</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <button
          type="submit"
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
