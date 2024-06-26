import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";
import config from "../config";
import { TFile } from "../types/cloudinary.type";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Cloudinary setup
const uploadToCloudinary = async (file: TFile): Promise<UploadApiResponse> => {
  try {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, { public_id: file.originalname });
    // Delete file from local system
    await fs.unlinkSync(file.path);
    return result;
  } catch (error) {
    throw error;
  }
};

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// export
export const fileUploader = {
  upload,
  uploadToCloudinary,
};
