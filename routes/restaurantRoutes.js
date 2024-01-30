import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

import {
  createRestaurantController,
  getAllRestaurantController,
  getSingleRestaurantController,
  deleteRestaurantController,
} from "../controllers/restaurantControllers.js";

//CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController);

//GET ALL RESTAURANT || GET
router.get("/getAll", getAllRestaurantController);

//GET SINGLE RESTAURANT || GET
router.get("/getSingle/:id", getSingleRestaurantController);

//DELETE RESTAURANT || DELETE
router.delete(
  "/deleteRestaurant/:id",
  authMiddleware,
  deleteRestaurantController
);

export default router;
