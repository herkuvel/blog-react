import { useContext } from "react";
import BlogContext from "../../context/blog";

function CreatePost() {
  const {
    title,
    content,
    handleSubmit,
    handleContentChange,
    handleTitleChange,
  } = useContext(BlogContext);

  return (
    <div className="createPost">
      <h2>Create A New Article</h2>
      <div>
        <form onSubmit={handleSubmit} className="createPostForm">
          <div className="inputDiv">
            <label>Title</label>
            <input
              type="text"
              name="newTitle"
              onChange={handleTitleChange}
              value={title}
              required
            />
          </div>
          <div className="inputDiv">
            <label>Content</label>
            <textarea
              name="newContent"
              onChange={handleContentChange}
              value={content}
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submitBtn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
