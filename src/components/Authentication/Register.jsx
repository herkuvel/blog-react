import { useContext, useEffect } from "react";
import BlogContext from "../../context/blog";

function Register() {
  const {
    handleNameChange,
    handlePasswordChange,
    handleRegister,
    name,
    password,
    user,
  } = useContext(BlogContext);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user);
  }, [user]);

  return (
    <div>
      <form className="registerForm" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="registerDiv">
          <label className="register-label">Name</label>
          <input
            className="register-input"
            onChange={handleNameChange}
            value={name}
            type="text"
            required
          />
        </div>
        <div className="registerDiv">
          <label className="register-label">Password</label>
          <input
            className="register-input"
            onChange={handlePasswordChange}
            value={password}
            type="password"
            required
          />
        </div>
        <button className="submitBtn">Register</button>
      </form>
    </div>
  );
}

export default Register;
