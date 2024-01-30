import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

//GET USER
export const getUserController = async (req, res, next) => {
  console.log(req.body.id);

  try {
    const user = await userModel.findById(
      { _id: req.body.id },
      { password: 0 }
    );

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    return res.status(200).send({ success: true, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Get User API", error });
  }

  res.status(200).send("User Data");
};

//UPDATE USER //USERNAME ADDRESS PHONE

export const updateUserController = async (req, res, next) => {
  const { userName, address, phone } = req.body;

  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    const updatedUser = await userModel.updateOne(
      { _id: req.body.id },
      { userName, address, phone }
    );

    res.status(201).send({
      success: true,
      message: "User Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Update User API", error });
  }
};

//UPDATE USER PASSWORD
export const updatePasswordController = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old and New Password",
      });
    }

    //Check Password

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(500)
        .send({ success: false, message: "Invalid Old Password" });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedPassword = await userModel.updateOne(
      { _id: req.body.id },
      { password: hashedPassword }
    );

    return res
      .status(201)
      .send({ success: true, message: "Successfully Updated Password" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update User Password API",
      error,
    });
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById({ _id: id });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    const deletedUser = await userModel.deleteOne({ _id: id });

    return res.status(201).send({
      success: true,
      message: "User Deleted Successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Delete User API" });
  }
};
