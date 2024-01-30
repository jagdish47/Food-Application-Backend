import userModel from "../models/userModel.js";

export default async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);

    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Can Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Admin Authentication Middleware",
      error,
    });
  }
};
