import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    // console.log(fullName, email, phoneNumber, password, role);
    // if any one is missing
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Enter complete details",
        status: false,
      });
    }

    // check user exists already or not

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User with given email id already exists",
        success: false,
      });
    }

    // encrypt password

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });

    res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log("user controller error", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Enter details first",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect emaill or password",
        success: false,
      });
    }

    // password entered by matches with hashed password?
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // check for role
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist in current role",
        success: false,
      });
    }

    // generate jwt token

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: true,
      })
      .json({
        message: `WelcomeBack!! ${user.fullName} `,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Login error", error);
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully!!",
      success: true,
    });
  } catch (error) {
    console.log("Logout error", error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // cloudinary here

    // since , skills will come in strings
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware auth

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // updating data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // resume will be here

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Update profile error", error);
  }
};
