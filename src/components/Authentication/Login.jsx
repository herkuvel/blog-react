import { useContext } from "react";
import BlogContext from "../../context/blog";

function Login() {
  const {
    login,
    handleLoginName,
    handleLoginPassword,
    loginName,
    loginPassword,
  } = useContext(BlogContext);

  return (
    <div className="loginNav">
      <form className="loginForm" onSubmit={login}>
        <div className="loginDiv">
          <label className="login-label">Name</label>
          <input
            className="login-input"
            type="text"
            onChange={handleLoginName}
            value={loginName}
            required
          />
        </div>
        <div className="loginDiv">
          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            onChange={handleLoginPassword}
            value={loginPassword}
            required
          />
        </div>
        <button className="submitBtn">Login</button>
      </form>
    </div>
  );
}

export default Login;
