import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/db_connection.handler";

const getAllPosts = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ name: "Pong" });
};

const createPost = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ success: true });
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
