const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    //Validation
    if (existingUser) {
      res.status(200).json({
        success: "Failed",
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new userModel(req.body);
    await user.save();

    return res.status(201).json({
      success: "Success",
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in register",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: "Failed",
        message: "User Not Found",
      });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      return res.status(500).json({
        success: "Failed",
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    return res.status(200).json({
      success: "Success",
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in login",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).json({
      success: "Success",
      message: "User Fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Unable to get current user",
    });
  }
};

module.exports = { register, login, getUser };
