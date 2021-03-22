import { Schema, model, models } from "mongoose";

const { Types } = Schema;

export interface IFile {
  fileName: string;
  fileLocation: string;
}

export interface IPost {
  _id: string;
  title: string;
  audio: IFile;
  pdf: IFile;
}

export const PostSchema = new Schema({
  pdf: { type: Object, default: {} },
  audio: { type: Object, default: {} },
  title: Types.String,
  category: { type: Types.ObjectId, ref: "category" },
});

export default models.post || model("post", PostSchema);
