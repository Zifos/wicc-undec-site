import type { NextApiRequest, NextApiResponse } from "next";
import PostModel from "../../../models/category.model";
import connectDB from "../../../utils/db_connection.handler";

const getAllPosts = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const categories = await PostModel.find().select("title");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createPost = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { body } = req;
    // eslint-disable-next-line camelcase
    const { title, category_id } = body;
    const newPost = new PostModel({
      title,
      category: category_id,
    });
    await newPost.save();
    res.status(200).json({ success: true, newPost: newPost.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getAllPosts(req, res);
      break;
    case "POST":
      createPost(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
