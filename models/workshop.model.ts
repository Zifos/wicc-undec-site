import { model, Schema, models } from "mongoose";
import { IPost } from "./post.model";

const { Types } = Schema;

export interface IWorkshop {
  title: string;
  _id: string;
  posts: IPost[];
  discord_link?: string;
  mozhubs_link?: string;
}

const WorkshopSchema = new Schema({
  title: Types.String,
  posts: { type: [{ type: Types.ObjectId, ref: "post" }], default: [] },
  discord_link: { type: Types.String, default: "" },
  mozhubs_link: { type: Types.String, default: "" },
  visits: Types.Number,
});

export default models.workshop || model("workshop", WorkshopSchema);
