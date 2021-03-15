import { model, Schema } from "mongoose";

const {
  Types
} = Schema;

export const CategorySchema = new Schema({
  category_name: Types.String,
  posts: { type: [{ type: Types.ObjectId, ref: 'post' }], default: [] },
});

export default model("category", CategorySchema);
