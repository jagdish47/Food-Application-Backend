import express from "express";
const router = express.Router();

import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} from "../controllers/foodController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

router.post("/create", authMiddleware, createFoodController);

router.get("/getAll", getAllFoodController);

router.get("/getSingle/:id", getSingleFoodController);

router.put("/update/:id", authMiddleware, updateFoodController);

router.delete("/delete/:id", authMiddleware, deleteFoodController);

//ORDER ROUTES

router.post("/placeorder", authMiddleware, placeOrderController);

//ORDER STATUS
router.post("/orderStatus/:id", adminMiddleware, orderStatusController);

export default router;
