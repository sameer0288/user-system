import React, { useState } from "react";
import { updatePost } from "../helper/postApi";

const UpdatePostForm = ({ postId, initialData }) => {
  const [formData, setFormData] = useState({ ...initialData });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await updatePost(postId, formData);
      console.log("Post updated:", data);
      // Add any additional logic (e.g., redirect) here
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
