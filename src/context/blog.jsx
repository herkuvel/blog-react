import axios from "axios";
import { useState, createContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

const BlogContext = createContext();

function Provider({ children }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/posts");
      const d = data.sort((a, b) => (a.postDate > b.postDate ? -1 : 1));
      d.sort((a, b) => {
        if (a.postDate === b.postDate) {
          return a.postDate - b.postDate;
        }
      });
      setPosts(d);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSinglePost = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const addNewPost = async (title, content) => {
    try {
      const response = await axios.post("http://localhost:3000/posts", {
        id: posts.length + 1,
        title,
        content,
        author: user.name,
        date: date,
        postDate: current,
      });
      const newPosts = [...posts, response.data];
      const d = newPosts.sort((a, b) => (a.postDate > b.postDate ? -1 : 1));
      d.sort((a, b) => {
        if (a.postDate === b.postDate) {
          return a.postDate - b.postDate;
        }
      });
      setPosts(d);

      const addUserPosts = async (userId) => {
        const user = await users.find((u) => u.id == userId);
        user.posts.push({
          id: posts.length + 1,
          title,
          postDate: current,
        });
        const responseAuthor = await axios.patch(
          `http://localhost:3000/users/${userId}/`,
          {
            posts: user.posts,
          }
        );
        setUsers(responseAuthor);
        return user;
      };

      addUserPosts(user.id);

      console.log("Post created.");
      alertify.success("Article created.");
      navigate(`/articles/${posts.length + 1}`);
    } catch (error) {
      console.log(error);
      alertify.error("Could not create post.");
    }
  };

  const deletePost = async (id, userId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      const afterDeletingPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(afterDeletingPosts);

      const deleteUserPost = async () => {
        const user = await users.find((u) => u.id == userId);
        const userPost = user.posts.find((u) => u.id == id);
        user.posts = user.posts.filter((p) => {
          return p.id !== userPost.id;
        });

        const response = await axios.patch(
          `http://localhost:3000/users/${userId}/`,
          {
            posts: user.posts,
          }
        );

        setUsers(response);
        return user;
      };
      deleteUserPost();

      navigate("/redirect");
      setLoading(false);
      alertify.success("Article deleted.");
    } catch (error) {
      console.log(error);
      alertify.error("Deletion failed.");
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPost(title, content);
    setTitle("");
    setContent("");
  };

  // Filters

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerHomePage] = useState(5);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerHomePage;
  const indexOfFirstPost = indexOfLastPost - postsPerHomePage;

  // Date Filter
  const filteredDates = posts
    .filter((post) => {
      const dataDate = new Date(post.date);
      return current - dataDate <= 25550000000 && current - dataDate > 0;
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  // Author Filter
  const authorFilter = posts.filter((post) => post.author === authorName);

  const handleChange = (e) => {
    setAuthorName(e.target.value);
  };

  // Pagination
  const currentHomePosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPosts, indexOfLastPosts);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // User

  const [user, setUser] = useState(() => {
    const savedItem = localStorage.getItem("user");
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || "";
  });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const register = async (name, password) => {
    try {
      const newUser = {
        id: users.length + 1,
        name,
        password,
        posts: [],
      };
      const res = await axios.post("http://localhost:3000/users", newUser);
      const newUsers = [...users, res.data];
      setUsers(newUsers);

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      console.log("Registration successfulled.");
      alertify.success("Registration successfulled.");
      navigate("/");
    } catch (error) {
      console.log(error);
      alertify.error("Registration failed.");
      setLoginName("");
      setLoginPassword("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(name, password);
    setName("");
    setPassword("");
  };

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    const isUser = users.find(
      (u) => u.name == loginName && u.password == loginPassword
    );

    if (isUser) {
      console.log("Login successfulled.");
      alertify.success("Login successfulled.");
      navigate("/");
      setUser({ id: isUser.id, name: isUser.name });
      localStorage.setItem("user", JSON.stringify(isUser));
      setLoginName("");
      setLoginPassword("");
    } else {
      console.log("Incorrect username or password.");
      alertify.error("Incorrect username or password.");
      setLoginName("");
      setLoginPassword("");
    }
  };

  const logout = () => {
    setUser("");
    alertify.success("Logout");
    localStorage.removeItem("user");
    console.log("Logout");
  };

  const handleLoginName = (e) => {
    setLoginName(e.target.value);
  };
  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const sharedValuesAndMethods = {
    posts,
    users,
    fetchPosts,
    fetchUsers,
    authorFilter,
    handleChange,
    loading,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
    title,
    content,
    fetchSinglePost,
    post,
    deletePost,
    filteredDates,
    currentPosts,
    currentHomePosts,
    paginate,
    postsPerPage,
    setAuthorName,
    authorName,
    name,
    password,
    handleNameChange,
    handlePasswordChange,
    handleRegister,
    setUser,
    user,
    login,
    logout,
    handleLoginName,
    handleLoginPassword,
    loginName,
    loginPassword,
  };

  return (
    <BlogContext.Provider value={sharedValuesAndMethods}>
      {children}
    </BlogContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
};

export { Provider };

export default BlogContext;
