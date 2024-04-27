import React, { useState } from "react";

const PostList = ({ posts, onUpdate, onDelete }) => {
  const [editedPosts, setEditedPosts] = useState({});

  const handleUpdate = (postId) => {
    const editedPost = editedPosts[postId];
    onUpdate(postId, editedPost);
    setEditedPosts((prevEditedPosts) => {
      const updatedEditedPosts = { ...prevEditedPosts };
      delete updatedEditedPosts[postId];
      return updatedEditedPosts;
    });
  };

  const handleEdit = (postId, title, content) => {
    setEditedPosts((prevEditedPosts) => ({
      ...prevEditedPosts,
      [postId]: { title, content },
    }));
  };

  const handleCancelEdit = (postId) => {
    setEditedPosts((prevEditedPosts) => {
      const updatedEditedPosts = { ...prevEditedPosts };
      delete updatedEditedPosts[postId];
      return updatedEditedPosts;
    });
  };

  const isPostEdited = (postId) => {
    return editedPosts.hasOwnProperty(postId);
  };

  return (
    <div className="mt-8 mr-11 ml-11">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              style={{ minHeight: "250px" }} // Set a fixed height for the post box
            >
              <div className="p-4">
                {isPostEdited(post._id) ? (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Edit Title</h3>
                    <input
                      type="text"
                      className="w-full border rounded-md p-2 mb-2"
                      placeholder="Title"
                      value={editedPosts[post._id].title}
                      onChange={(e) =>
                        setEditedPosts((prevEditedPosts) => ({
                          ...prevEditedPosts,
                          [post._id]: {
                            ...prevEditedPosts[post._id],
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                    <h3 className="text-lg font-semibold mb-2">Edit Content</h3>
                    <textarea
                      className="w-full h-32 border rounded-md p-2 mb-4"
                      placeholder="Content"
                      value={editedPosts[post._id].content}
                      onChange={(e) =>
                        setEditedPosts((prevEditedPosts) => ({
                          ...prevEditedPosts,
                          [post._id]: {
                            ...prevEditedPosts[post._id],
                            content: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>

                    <p className="text-gray-600 mb-4">{post.content}</p>
                  </>
                )}
              </div>
              <div className="bg-gray-200 p-4 flex justify-end">
                {isPostEdited(post._id) ? (
                  <>
                    <button
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleUpdate(post._id)}
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      onClick={() => handleCancelEdit(post._id)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() =>
                      handleEdit(post._id, post.title, post.content)
                    }
                  >
                    Edit
                  </button>
                )}
                <button
                  className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => onDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
