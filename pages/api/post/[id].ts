import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../../utils/auth_middleware";
import Models from "../../../models";
import connectDB from "../../../utils/db_connection.handler";

const getPostById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    const post = await Models.PostModel.findById(id).populate(
      "category",
      // select fields
      "title"
    );
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePostTitleById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id, title },
    } = req;

    const newPost = await Models.PostModel.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.status(204).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removePostById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id },
    } = req;
    const removedQuantity = await Models.PostModel.deleteOne({ _id: id });
    res.status(200).json({ success: !!removedQuantity });
  } catch (error) {
    res.status(500).json(error);
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getPostById(req, res);
      break;
    case "PUT":
      AuthMiddleware(updatePostTitleById)(req, res);
      break;
    case "DELETE":
      AuthMiddleware(removePostById)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
