import Posts from "./Posts";
import { useContext } from "react";
import BlogContext from "../../context/blog";
import Pagination from "../Pagination";

function AllPosts() {
  const {
    posts,
    authorFilter,
    handleChange,
    loading,
    setAuthorName,
    currentPosts,
    authorName,
    users,
  } = useContext(BlogContext);

  return (
    <div className="postPage">
      <h1>All Articles</h1>
      <div>
        <ul className="authorSelectDiv" onClick={handleChange}>
          {users.map((user) => {
            return (
              <div key={user.id}>
                {user.posts.length > 0 && (
                  <button className="authorSelect" value={user.name}>
                    {user.name}
                  </button>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        {authorName && (
          <a style={{ cursor: "pointer" }} onClick={() => setAuthorName("")}>
            See all articles
          </a>
        )}
      </div>
      {loading ? (
        "Loading"
      ) : (
        <div>
          {authorName ? (
            <Posts posts={authorFilter} />
          ) : (
            <Posts posts={currentPosts} />
          )}
        </div>
      )}

      <div>
        <Pagination totalPosts={posts.length} />
      </div>
    </div>
  );
}

export default AllPosts;
