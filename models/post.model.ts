import { Schema, model, models } from "mongoose";

const { Types } = Schema;

export const PostSchema = new Schema({
  pdf: { type: Object, default: {} },
  audio: { type: Object, default: {} },
  title: Types.String,
  category: { type: Types.ObjectId, ref: "category" },
});

const PostModel = model("post", PostSchema);

export default models.post || PostModel;
