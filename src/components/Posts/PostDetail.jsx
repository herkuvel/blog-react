import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import BlogContext from "../../context/blog";

function PostDetail() {
  const { id } = useParams();
  const { fetchSinglePost, post, loading, deletePost, user } =
    useContext(BlogContext);

  useEffect(() => {
    fetchSinglePost(id);
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="postDetail">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.author}</p>
          <p>{post.date}</p>
          {user.name === post.author && (
            <button className="deleteBtn" onClick={() => deletePost(post.id,user.id)}>
              Sil
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default PostDetail;
