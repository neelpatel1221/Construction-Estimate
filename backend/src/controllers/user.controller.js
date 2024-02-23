import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Calculation } from "../models/calculation.models.js";
import Excel from "exceljs";
import generateExcelFile from "../utils/generateExcelFile.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const user = await User.create({
    email,
    password,
    fullName,
  });

  const createdUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged In successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "current user fetched successfully"
      )
    );
});

const getCurrentUserCalculations = asyncHandler(async (req, res) => {
  const userCalculations = await Calculation.find({ userId: req.user._id });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userCalculations },
        "User calculation fetched successfuly"
      )
    );
});

const convertCalcualtionToExcel = asyncHandler(async (req, res) => {
  try {
    const calculationId = req.params.calculationId;
    const calculationData = await Calculation.findById(calculationId);
    if (!calculationData) {
      throw new ApiError(401, "Invalid Id");
    }

    await generateExcelFile(calculationData, res);

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Excel File created successfully"));
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).send("Internal Server Error");
  }
});

const deleteUserCalculation = asyncHandler(async (req, res) => {
  const calculation = await Calculation.findByIdAndDelete(
    req.params.calculationId
  );

  if (!calculation) {
    throw new ApiError(401, "Invalid Id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Calculation Deleted Successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getCurrentUserCalculations,
  convertCalcualtionToExcel,
  deleteUserCalculation,
};
