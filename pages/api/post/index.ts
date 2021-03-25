/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import AuthMiddleware from "../../../utils/auth_middleware";
import filehandler from "../../../utils/filehandler";
import initMiddleware from "../../../utils/initMiddleware";
import PostModel from "../../../models/post.model";
import connectDB from "../../../utils/db_connection.handler";
import CategoryModel from "../../../models/category.model";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getAllPosts = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // limiting files size to 5 MB
  },
});

const multerFields = initMiddleware(
  uploader.fields([
    {
      name: "paper",
    },
    {
      name: "audio",
    },
  ])
);

interface NextApiRequestWithFiles extends NextApiRequest {
  files: {
    audio: {
      originalname: string;
      mimetype: string;
      buffer: Buffer;
    }[];
    paper: {
      originalname: string;
      mimetype: string;
      buffer: Buffer;
    }[];
  };
}

const createPost = async (
  req: NextApiRequestWithFiles,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { body } = req;
    // eslint-disable-next-line camelcase
    const { title, category_id } = body;

    const audioFile = req.files.audio[0];
    const paperFile = req.files.paper[0];

    const pdfData = await filehandler.save(
      paperFile.originalname,
      paperFile.mimetype,
      paperFile.buffer
    );
    let audioData;
    try {
      audioData = await filehandler.save(
        audioFile.originalname,
        audioFile.mimetype,
        audioFile.buffer
      );
    } catch (error) {
      const fileRemoved = await filehandler.remove(pdfData.fileName);
      if (fileRemoved) {
        throw new Error(`Couldn't save audio file ${error}`);
      }
      throw new Error(
        `Couldn't save audio file and error when tryied to remove pdf ${pdfData.fileName} file please remove it manually ${error}`
      );
    }

    const newPost = new PostModel({
      title,
      category: category_id,
      pdf: pdfData,
      audio: audioData,
    });
    await newPost.save();
    await CategoryModel.findByIdAndUpdate(
      category_id,
      { $push: { posts: newPost._id as never } },
      { upsert: true }
    );
    res.status(200).json({ success: true, newPost: newPost.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const handler = async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getAllPosts(req, res);
      break;
    case "POST":
      await multerFields(req, res);
      AuthMiddleware(createPost)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
