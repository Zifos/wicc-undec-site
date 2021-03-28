import { Schema, model, models } from "mongoose";
import { ICategory } from "./category.model";

const { Types } = Schema;

export interface IFile {
  fileName: string;
  fileLocation: string;
}

export interface IAuthor {
  name: string;
}

export interface IPost {
  _id: string;
  title: string;
  description?: string;
  article_id: string;
  author: IAuthor;
  audio: IFile;
  pdf: IFile;
  category: ICategory;
}

export const PostSchema = new Schema({
  pdf: { type: Object, default: {} },
  audio: { type: Object, default: {} },
  title: Types.String,
  description: { type: Types.String, default: "" },
  article_id: Types.String,
  author: { type: Object, default: {} },
  category: { type: Types.ObjectId, ref: "category" },
});

export default models.post || model("post", PostSchema);
