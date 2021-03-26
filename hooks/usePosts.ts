import { useState } from "react";
import { IPost } from "../models/post.model";

const usePosts = (
  initialPosts: IPost[]
): {
  posts: IPost[];
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
    const formData = new FormData();

    formData.append("title", title);
    formData.append("paper", pdf);
    formData.append("audio", audio);
    formData.append("category_id", String(category_id));

    const updatedPost: IPost = await fetch(`/api/post/${_id}`, {
      method: "PUT",
      body: formData,
    }).then((res) => res.json());
    const updatedPostIndex = posts.findIndex(
      (post) => post._id === updatedPost._id
    );
    setPosts((values) => {
      values.splice(updatedPostIndex, 1, updatedPost);
      return [...values];
    });
  };

  const deletePost = async (_id: string) => {
    const success = await fetch(`/api/post/${_id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const deletedPostIndex = posts.findIndex((cat) => cat._id === _id);
    setPosts((values) => {
      values.splice(deletedPostIndex, 1);
      return [...values];
    });
    return success as { success: boolean };
  };

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;
