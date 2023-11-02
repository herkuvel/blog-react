import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useContext } from "react";
import BlogContext from "./context/blog";
import CreatePost from "./components/Posts/CreatePost";
import PostDetail from "./components/Posts/PostDetail";
import PostsPage from "./components/PostsPage";
import NotFound from "./components/NotFound";
import Register from "./components/Authentication/Register";
import Redirect from "./components/Redirect";

function App() {
  const { fetchPosts, fetchUsers, users } = useContext(BlogContext);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [users]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/articles" element={<PostsPage />} />
        <Route path="/articles/:id" element={<PostDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
