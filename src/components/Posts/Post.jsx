import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Date: {post.date}</p>
      <Link to={`/articles/${post.id}`}>
        <p>See more</p>
      </Link>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
