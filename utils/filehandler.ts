import admin from "./firebase_connection";

const bucket = admin.storage().bucket();

interface IFileSaved {
  fileName: string;
  fileLocation: string;
}

const save = (
  fileName: string,
  fileMimeType: string,
  fileBuffer: Buffer
): Promise<IFileSaved> =>
  new Promise((resolve, reject) => {
    const blob = bucket.file(fileName);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: fileMimeType,
      },
    });

    blobWriter.on("error", (err) => reject(err));

    blobWriter.on("finish", () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      // Return the file name and its public URL
      resolve({
        fileName,
        fileLocation: publicUrl,
      });
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(fileBuffer);
  });

const remove = async (filename: string): Promise<boolean> => {
  try {
    await bucket.file(filename).delete();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  save,
  remove,
};
