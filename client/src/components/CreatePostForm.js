import React, { useState, useEffect } from "react";
import { createPost } from "../helper/postApi";
import PostList from "./PostList";
const CreatePostForm = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createPost(formData);
      // console.log("Post created:", data);
      setFormData({ title: "", content: "" }); // Clear form fields
      onPostCreated(data); // Call the onPostCreated function with the new post data
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h1 className="text-xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="content">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
