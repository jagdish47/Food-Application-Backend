import express from "express";
const router = express.Router();

import {
  getUserController,
  updatePasswordController,
  updateUserController,
  deleteUserController,
} from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE USER || PUT
router.put("/updateUser", authMiddleware, updateUserController);

//UPDATE PASSWORD || POST
router.post("/updatePassword", authMiddleware, updatePasswordController);

//DELETE USER || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

export default router;
