const UserInfo = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "40px" }}>
      <h2>사용자 이름 : {localStorage.getItem("username")}</h2>
      <h2>API key : {localStorage.getItem("token")}</h2>
    </div>
  );
};

export default UserInfo;
