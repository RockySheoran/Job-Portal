import userModel from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/Cloudinary.js";
import { getDataUri } from "../utils/DataUri.js";



export const register = async (req, res) => {
  try {
    const { fullname, role, email, phoneNumber, password } = req.body;
    const file = req.file;
    if (!fullname || !role || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
        const   fileDataUri = getDataUri(file);

        const cloudinaryResponse = await cloudinary.uploader.upload(fileDataUri.content);


    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exits with this email.",
        success: false,
      });
    }
    // if(cloudinaryResponse){
    //   user.profile.profilePhoto = file.originalname;
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      fullname,
      role,
      email,
      phoneNumber,
      password: hashedPassword, 
      profile:{
        profilePhoto: cloudinaryResponse.secure_url,
      }
      
    });

    return res.status(201).json({
      message: `account created successfully`,
      success: true,
    });
  } catch (error) {
    console.log("register err", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Access doesn't exist with current role. ",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,

        sameSite: "none",
        secure: true,
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log("login error", error);
  }
};

export const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout successfully",
      success: true,
    });
  } catch (error) { }
};

//   updateProfile

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // Assuming middleware adds file to req
    // cloudinary

    const fileDataUri = getDataUri(file);

    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(fileDataUri.content);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({
        message: "Failed to upload file to Cloudinary",
        success: false,
      });
    }



    const userId = req.id; // Extracted from authentication middleware
    let user = await userModel.findById(userId); // Corrected findById usage
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    // cloudinary.config({ debug: true });


    // Update fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // Process skills if provided
    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      user.profile.skills = skillsArray;
    }

    // Update resume URL if uploaded
    if (cloudinaryResponse) {
      user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    // Save the updated user
    await user.save();


    // Prepare response object
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
