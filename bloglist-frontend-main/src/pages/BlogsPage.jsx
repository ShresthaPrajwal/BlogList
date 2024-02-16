import { useEffect } from "react";
import Blog from "../components/Blog";

import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";

import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

import {
  deleteBlogAction,
  getBlogsAction,
  updateLikesAction,
} from "../reducers/blogReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => {
    return state.blogs;
  });
  const user = useSelector((state) => {
    return state.user;
  });

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getBlogsAction());
  }, []);
  const handleCreate = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      dispatch(updateMessage(`Some Error Occured`, 5000));
    }
  };
  const blogForm = () => (
    <Togglable  buttonLabel="Add Blog" ref={blogFormRef}>
      <BlogForm handleSubmit={handleCreate} />
    </Togglable>
  );

  const deletePost = (obj) => {
    dispatch(deleteBlogAction(obj));
  };
  const updateLikes = (obj) => {
    dispatch(updateLikesAction(obj));
  };

  return (
    <div className="bg-gray-800 flex-col justify-center text-center p-2">
      <div >
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deletePost={deletePost}
          user={user}
        />
      ))}
      </div>
      
      {user !== null && blogForm()}
    </div>
  );
};

export default BlogPage;
