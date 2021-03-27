import { useState } from "react";
import { IPost } from "../models/post.model";

const usePosts = (
  initialPosts: IPost[]
): {
  posts: IPost[];
  loading: boolean;
  createPost: (newPost: {
    title: string;
    pdf: File;
    audio: File;
    category_id: string | number;
  }) => void;
  updatePost: (cat: {
    _id: string;
    title: string;
    pdf: File;
    audio: File;
  }) => void;
  deletePost: (_id: string) => Promise<{ success: boolean }>;
} => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts || []);
  const [loading, setLoading] = useState<boolean>(false);

  const createPost = async ({
    title,
    pdf,
    audio,
    category_id,
  }: {
    title: string;
    pdf: File;
    audio: File;
    category_id: string | number;
  }) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("paper", pdf);
    formData.append("audio", audio);
    formData.append("category_id", String(category_id));
    const { newPost }: { newPost: IPost } = await fetch("/api/post", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    setPosts((values) => [...values, newPost]);
    setLoading(false);
  };

  const updatePost = async ({
    _id,
    title,
    pdf,
    audio,
    category_id,
  }: {
    _id: string;
    title: string;
    pdf: File;
    audio: File;
    category_id: string | number;
  }) => {
    setLoading(true);
    const formData = new FormData();

    if (title) {
      formData.append("title", title);
    }
    if (pdf) {
      formData.append("paper", pdf);
    }
    if (audio) {
      formData.append("audio", audio);
    }
    if (category_id) {
      formData.append("category_id", String(category_id));
    }

    const { newPost }: { newPost: IPost } = await fetch(`/api/post/${_id}`, {
      method: "PUT",
      body: formData,
    }).then((res) => res.json());
    const updatedPost = newPost;
    const updatedPostIndex = posts.findIndex(
      (post) => post._id === updatedPost._id
    );
    setPosts((values) => {
      values.splice(updatedPostIndex, 1, updatedPost);
      return [...values];
    });
    setLoading(false);
  };

  const deletePost = async (_id: string) => {
    setLoading(true);
    const success = await fetch(`/api/post/${_id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const deletedPostIndex = posts.findIndex((cat) => cat._id === _id);
    setPosts((values) => {
      values.splice(deletedPostIndex, 1);
      return [...values];
    });
    setLoading(false);
    return success as { success: boolean };
  };

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;
