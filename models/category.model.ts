import { model, Schema, models } from "mongoose";
import { IPost } from "./post.model";

const { Types } = Schema;

export interface ICategory {
  title: string;
  _id: string;
  posts: IPost[];
}

const CategorySchema = new Schema({
  title: Types.String,
  posts: { type: [{ type: Types.ObjectId, ref: "post" }], default: [] },
});

export default models.category || model("category", CategorySchema);
