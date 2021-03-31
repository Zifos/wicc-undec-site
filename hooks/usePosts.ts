import { useState } from "react";
import { IAuthor, IPost } from "../models/post.model";

type CRUDPost = {
  _id: string;
  title: string;
  description?: string;
  pdf: File;
  audio: File;
  workshop_id: string | number;
  article_id: string;
  author: IAuthor;
};

const usePosts = (
  initialPosts: IPost[]
): {
  posts: IPost[];
  loading: boolean;
  createPost: (newPost: Omit<CRUDPost, "_id">) => void;
  updatePost: (cat: CRUDPost) => void;
  deletePost: (_id: string) => Promise<{ success: boolean }>;
} => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts || []);
  const [loading, setLoading] = useState<boolean>(false);

  const createPost = async ({
    title,
    description,
    pdf,
    audio,
    workshop_id,
    article_id,
    author,
  }: Omit<CRUDPost, "_id">) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("paper", pdf);
    formData.append("audio", audio);
    formData.append("workshop_id", String(workshop_id));
    formData.append("article_id", article_id);
    formData.append("author", JSON.stringify(author));
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
    description,
    pdf,
    audio,
    workshop_id,
    article_id,
    author,
  }: CRUDPost) => {
    setLoading(true);
    const formData = new FormData();

    if (title) {
      formData.append("title", title);
    }
    if (description) {
      formData.append("description", description);
    }
    if (pdf) {
      formData.append("paper", pdf);
    }
    if (audio) {
      formData.append("audio", audio);
    }
    if (workshop_id) {
      formData.append("workshop_id", String(workshop_id));
    }
    if (article_id) {
      formData.append("article_id", article_id);
    }
    if (author) {
      formData.append("author", JSON.stringify(author));
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
