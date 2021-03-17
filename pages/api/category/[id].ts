import type { NextApiRequest, NextApiResponse } from "next";
import CategoryModel from "../../../models/category.model";
import connectDB from "../../../utils/db_connection.handler";

const getCategoryById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    const category = await CategoryModel.find({ _id: id }).populate(
      "posts",
      // select fields
      "title"
    );
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeCategoryById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  const removedQuantity = await CategoryModel.deleteOne({ _id: id });
  res.status(200).json({ success: !!removedQuantity });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getCategoryById(req, res);
      break;
    case "DELETE":
      removeCategoryById(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
