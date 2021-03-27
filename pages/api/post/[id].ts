import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import filehandler from "../../../utils/filehandler";
import AuthMiddleware from "../../../utils/auth_middleware";
import Models from "../../../models";
import connectDB from "../../../utils/db_connection.handler";
import initMiddleware from "../../../utils/initMiddleware";

const getPostById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    const post = await Models.PostModel.findById(id).populate(
      "category",
      // select fields
      "title"
    );
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
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

const updatePostTitleById = async (
  req: NextApiRequestWithFiles,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id },
    } = req;
    const { body } = req;
    const { title, category_id } = body;

    let updateQuery: { [key: string]: unknown } = {};

    if (title) {
      updateQuery.title = title;
    }

    if (category_id) {
      updateQuery.category = category_id;
    }

    const audioFile = req.files?.audio?.length && req.files.audio[0];
    const paperFile = req.files?.paper?.length && req.files.paper[0];

    if (audioFile) {
      const audioData = await filehandler.save(
        audioFile.originalname,
        audioFile.mimetype,
        audioFile.buffer
      );
      updateQuery.audio = audioData;
    }

    if (paperFile) {
      const pdfData = await filehandler.save(
        paperFile.originalname,
        paperFile.mimetype,
        paperFile.buffer
      );
      updateQuery.pdf = pdfData;
    }

    const oldPost = await Models.PostModel.findById(id);

    const newPost = await Models.PostModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (category_id && oldPost.category !== category_id) {
      const oldCategory = await Models.CategoryModel.findById(oldPost.category);

      oldCategory.posts.pull(oldPost.id);

      await oldCategory.save();

      await Models.CategoryModel.findByIdAndUpdate(
        category_id,
        { $push: { posts: newPost._id as never } },
        { upsert: true }
      );
    }

    res.status(200).json({ success: true, newPost: newPost.toObject() });
  } catch (error) {
    res.status(500).json(error);
  }
};

const removePostById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id },
    } = req;
    const postForRemove = await Models.PostModel.findById(id).exec();
    await filehandler.remove(postForRemove.pdf.fileName);
    await filehandler.remove(postForRemove.audio.fileName);

    const removedQuantity = await Models.PostModel.deleteOne({ _id: id });
    res.status(200).json({ success: !!removedQuantity });
  } catch (error) {
    res.status(500).json(error);
  }
};

const handler = async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getPostById(req, res);
      break;
    case "PUT":
      await multerFields(req, res);
      AuthMiddleware(updatePostTitleById)(req, res);
      break;
    case "DELETE":
      AuthMiddleware(removePostById)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
