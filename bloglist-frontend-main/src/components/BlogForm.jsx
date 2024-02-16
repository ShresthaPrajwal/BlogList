import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMessage } from "../reducers/notificationReducer";
import { addBlogAction } from "../reducers/blogReducer";
const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [urlsite, setUrlsite] = useState("");

  const dispatch = useDispatch();
  const addBlog = (event) => {
    event.preventDefault();

    const blog = {
      title: title,
      author: author,
      url: urlsite,
      likes: 0,
    };
    dispatch(addBlogAction(blog));
    setAuthor("");
    setTitle("");
    setUrlsite("");
    dispatch(updateMessage(`Blog named "${title}" Added`, 5000));
    handleSubmit();
  };
  return (
    <div className="bg-gray-800">
      <form
        onSubmit={addBlog}
        className="flex flex-col justify-center content-center"
      >
        <div className="flex justify-center content-center m-2">
          <input
            id="title"
            placeholder="Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex justify-center content-centerm-2">
          <input
            placeholder="Author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div className="flex justify-center content-center m-2">
          <input
            placeholder="URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            id="url"
            value={urlsite}
            onChange={(event) => setUrlsite(event.target.value)}
          />
        </div>
        <div className="flex justify-center content-center m-2">
          <button
            class="text-gray-900 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            type="submit"
            id="add-button"
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
