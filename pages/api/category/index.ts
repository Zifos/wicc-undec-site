import type { NextApiRequest, NextApiResponse } from "next";
import CategoryModel from "../../../models/category.model";
import connectDB from "../../../utils/db_connection.handler";

const getAllCategories = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const categories = await CategoryModel.find().populate("posts", "_id");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { body } = req;
    const newCategory = new CategoryModel({
      title: body.title,
    });
    await newCategory.save();
    res
      .status(200)
      .json({ success: true, newCategory: newCategory.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      await getAllCategories(req, res);
      break;
    case "POST":
      await createCategory(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
  res.end();
};

export default connectDB(handler);
