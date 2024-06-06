import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.status(StatusCodes.OK).json({
    message: "Data received",
    data: user.toJSON(),
  });
};

export const updateUser = async (req, res) => {
  const updatedData = { ...req.body };
  delete updatedData.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    updatedData.avatar = response.secure_url;
    updatedData.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, updatedData);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

export const getApplicationStats = async (req, res) => {
  const jobs = await Job.countDocuments();
  const users = await User.countDocuments();
  res.status(StatusCodes.OK).json({
    message: "Data received",
    users,
    jobs,
  });
};
