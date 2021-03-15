import { model, Schema } from "mongoose";
import { PostSchema } from "./post.model";

export const CategorySchema = new Schema({
  category_name: String,
  posts: { type: [PostSchema], default: [] },
});

export default model("category", CategorySchema);
