import Posts from "./Posts/Posts";
import { useContext, useEffect } from "react";
import BlogContext from "../context/blog";
import { Link } from "react-router-dom";
import Authors from "./Posts/Authors";

function Home() {
  const {
    posts,
    loading,
    filteredDates,
    currentHomePosts,
    setUser,
    descendingUsers,
  } = useContext(BlogContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setUser(items);
    }
  }, []);

  return (
    <div className="home">
      <div className="col">
        <div className="lastPosts">
          <h2>Last Articles</h2>
          <div>{posts && <Posts posts={filteredDates} />}</div>
        </div>
      </div>
      <div className="col">
        <div className="allPosts">
          <h2>All Articles</h2>
          <div>
            {loading ? "Loading..." : <Posts posts={currentHomePosts} />}
          </div>
          <Link to="/articles">
            <p>See all</p>
          </Link>
        </div>
      </div>
      <div className="col">
        <div className="bestAuthors">
          <h2>Best Authors</h2>
          <div>{posts && <Authors users={descendingUsers} />}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
