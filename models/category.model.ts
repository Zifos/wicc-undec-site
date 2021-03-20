import { model, Schema, models } from "mongoose";

const { Types } = Schema;

export interface ICategory {
  title: string;
  _id: string;
  posts: {
    _id: string;
    title: string;
    pdfURL?: string;
    audioURL?: string;
  }[];
}

const CategorySchema = new Schema({
  title: Types.String,
  posts: { type: [{ type: Types.ObjectId, ref: "post" }], default: [] },
});

export default models.category || model("category", CategorySchema);
