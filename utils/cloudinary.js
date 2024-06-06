import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath){
      console.log("No file");
      return null;
    }
    // Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath);
    // Delete the file from the server
    // fs.unlinkSync(localFilePath);
    console.log(response);
    return response;
  } catch (error) {
    // Remove the file from the local filesystem
    fs.unlinkSync(localFilePath);
    return null;
  }
};
