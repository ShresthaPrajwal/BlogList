import React from "react";

import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import BlogForm from "./BlogForm";
import Blog from "./Blog";

describe("Blog Component", () => {
  const blog = {
    _id: "65b4f7dc1a5a42c3817deba4",
    title: "Hanny and Canny",
    author: "Hk",
    url: "https://www.google.com/search?q=ds&rlz=1C1CHWL_enNP1022NP1022&oq=ds&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBCTE3MjdqMGoxNagCALACAA&sourceid=chrome&ie=UTF-8",
    likes: 15,
    user: {
      username: "root",
      name: "Superuser",
      id: "65afd3e0e0bb98ce8e6d0622",
    },
    __v: 0,
  };
  test("renders Blogs", () => {
    const component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent(
      `${blog.title} --- ${blog.author}`
    );
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(`Likes ${blog.likes}`);
  });

  test('renders details after clicking "👁️" button', () => {
    const component = render(<Blog blog={blog} />);

    const button = component.getByText("👁️");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(`Likes ${blog.likes}`);
    expect(component.container).toHaveTextContent(blog.user.name);
  });

  test('calls the event handler twice when "👍" button is clicked twice', () => {
    const mockUpdateLikes = jest.fn();
    const component = render(<Blog blog={blog} updateLikes={mockUpdateLikes} />);
    const button = component.getByText("👁️");
    fireEvent.click(button);

    const likeButton = component.getByText('👍');

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockUpdateLikes).toHaveBeenCalledTimes(2);
    expect(mockUpdateLikes).toHaveBeenCalledWith(blog._id);
  });
});
describe('BlogForm component', () => {
  test('calls the event handler with the right details when a new blog is created', () => {
    const mockHandleSubmit = jest.fn();
    const component = render(<BlogForm handleSubmit={mockHandleSubmit} />);
    const titleInput = component.getByLabelText('Title');
    const authorInput = component.getByLabelText('Author');
    const urlInput = component.getByLabelText('Url');
    const form = component.container.querySelector('form');

    // Fill in the form
    fireEvent.change(titleInput, { target: { value: 'Test Blog' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.change(urlInput, { target: { value: 'http://test.com' } });

    // Submit the form
    fireEvent.submit(form);

    // Check if the event handler is called with the correct details
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 0,
    });
  });
});