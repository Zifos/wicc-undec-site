import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import initMiddleware from "../../../utils/initMiddleware";
import PostModel from "../../../models/category.model";
import connectDB from "../../../utils/db_connection.handler";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // limiting files size to 5 MB
  },
});

const multerFields = initMiddleware(
  uploader.fields([
    {
      name: "paper-pdf",
    },
    {
      name: "audio",
    },
  ])
);

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getAllPosts(req, res);
      break;
    case "POST":
      await multerFields(req, res);
      createPost(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
