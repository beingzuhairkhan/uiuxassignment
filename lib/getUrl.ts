import { storage } from "../appwrite";

interface ImageType {
  bucketId: string;
  fileId: string;
}

const getURL = async (image: ImageType) => {
  if (!image?.bucketId || !image?.fileId) {
    throw new Error("Invalid image object");
  }
  return storage.getFilePreview(image.bucketId, image.fileId);
};

export default getURL;
