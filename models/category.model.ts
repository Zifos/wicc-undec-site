import { model, Schema, models } from "mongoose";

const { Types } = Schema;

const CategorySchema = new Schema({
  title: Types.String,
  posts: { type: [{ type: Types.ObjectId, ref: "post" }], default: [] },
});

export default models.category || model("category", CategorySchema);
