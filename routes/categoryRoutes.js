import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

import {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} from "../controllers/categoryControllers.js";

//CREATE CATEGORY || POST
router.post("/create", authMiddleware, createCatController);

//GET ALL CATEGORY || GET
router.get("/getAll", getAllCatController);

//UPDATE CATEGORY || PUT
router.put("/update/:id", authMiddleware, updateCatController);

//DELETE CATEGORY || DELETE
router.delete("/delete/:id", authMiddleware, deleteCatController);

export default router;
