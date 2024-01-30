import express from "express";
const router = express.Router();

import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";

//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

export default router;
