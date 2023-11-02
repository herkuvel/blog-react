import Post from "./Post";
import PropTypes from "prop-types";

function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post, index) => {
        return <Post post={post} key={index} />;
      })}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
