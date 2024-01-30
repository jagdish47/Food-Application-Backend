import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//REGISTER
export const registerController = async (req, res, next) => {
  try {
    const { userName, email, password, phone, address } = req.body;

    //validation
    if (!userName || !email || !password || !phone || !address) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide All Fields" });
    }

    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered Please Login",
      });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    res
      .status(201)
      .send({ success: true, message: "Successfully Registered", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check fields
    if (!email || !password) {
      return res
        .status(200)
        .send({ success: false, message: "Please Provide All Fields" });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "The User for this Email address is not available.",
      });
    }

    //doesn't matching password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "The user's password is Incorrect.",
      });
    }

    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(201)
      .send({ success: true, message: "Login Successfully", token, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error In Login API", error });
  }
};
