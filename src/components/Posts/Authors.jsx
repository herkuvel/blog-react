import { useContext } from "react";
import BlogContext from "../../context/blog";

function Authors() {
  const { users } = useContext(BlogContext);

  return (
    <div className="authorsDiv">
      {users.map((user, i) => (
        <li className="authors" key={i}>
          {user.posts.length > 0 && (
            <>
              {user.name}: {user.posts.length} Articles
            </>
          )}
        </li>
      ))}
    </div>
  );
}

export default Authors;
