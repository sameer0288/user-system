const BASE_URL = "https://user-system-ykwp.onrender.com/api";
// console.log(BASE_URL);

export const getAllPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
export const createPost = async (postData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
