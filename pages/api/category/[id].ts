import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../../utils/auth_middleware";
import Models from "../../../models";
import connectDB from "../../../utils/db_connection.handler";

const getCategoryById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    const category = await Models.CategoryModel.findById(id).populate(
      "posts",
      // select fields
      "title"
    );
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCategoryTitleById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id },
    } = req;
    const { title } = JSON.parse(req.body);
    const newCategory = await Models.CategoryModel.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.status(200).json(newCategory);
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
  const removedQuantity = await Models.CategoryModel.deleteOne({ _id: id });
  res.status(200).json({ success: !!removedQuantity });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getCategoryById(req, res);
      break;
    case "PUT":
      AuthMiddleware(updateCategoryTitleById)(req, res);
      break;
    case "DELETE":
      AuthMiddleware(removeCategoryById)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
