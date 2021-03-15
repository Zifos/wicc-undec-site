import { Schema, model } from "mongoose";

export const PostSchema = new Schema({
  pdf_url: String,
  audio_url: String,
  title: String,
});

export default model("post", PostSchema);
