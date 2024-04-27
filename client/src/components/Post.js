import React, { useState, useEffect } from "react";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../helper/postApi";
import PostList from "../components/PostList";
import CreatePostForm from "../components/CreatePostForm";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = async (newPost) => {
    try {
      const createdPost = await createPost(newPost);
      setPosts([...posts, createdPost]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleUpdatePost = async (postId, updatedPostData) => {
    try {
      const updatedPost = await updatePost(postId, updatedPostData);
      setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <CreatePostForm onPostCreated={handlePostCreated} />
      <PostList
        posts={posts}
        onUpdate={handleUpdatePost}
        onDelete={handleDeletePost}
      />
    </div>
  );
};

export default Post;
