import { useContext } from "react";
import { NavLink } from "react-router-dom";
import BlogContext from "../context/blog";
import Login from "./Authentication/Login";

function Navbar() {
  const { user, logout } = useContext(BlogContext);
  return (
    <div className="nav">
      <nav>
        <NavLink to="">Homepage</NavLink>
        <NavLink to="articles">Articles</NavLink>
        {user && <NavLink to="createpost">Create Article</NavLink>}
        {user && <NavLink onClick={logout}>Logout</NavLink>}
        {!user && <NavLink to="register">Register</NavLink>}
      </nav>

      {!user && <Login />}
    </div>
  );
}

export default Navbar;
