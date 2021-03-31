import { model, Schema, models } from "mongoose";
import { IPost } from "./post.model";

const { Types } = Schema;

export interface IWorkshop {
  title: string;
  _id: string;
  posts: IPost[];
}

const WorkshopSchema = new Schema({
  title: Types.String,
  posts: { type: [{ type: Types.ObjectId, ref: "post" }], default: [] },
});

export default models.workshop || model("workshop", WorkshopSchema);
