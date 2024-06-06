import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    message: "User created successfully",
    data: user.toJSON(),
  });
};

export const login = async (req, res) => {
  //* 1. Collect validate data from request body
  const { email, password } = req.body;
  //* 2. Check if user is existing or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  //* 3. Check if password is correct or not
  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  //* 4. Create JWT token if correct data is provided
  const token = createJWT({ userId: user._id, role: user.role });
  //* 5. Send JWT token to the client as HTTP only cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production",
  });
  //* 6. Send response to the client
  res.status(StatusCodes.OK).json({
    message: "User logged in successfully",
    data: user.toJSON(),
  });
};

export const logout = async (req, res) => {
  // res.clearCookie("token");
  // res.status(StatusCodes.OK).json({
  //   message: "User logged out successfully",
  // });
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({
    message: "User logged out successfully",
  });
};
