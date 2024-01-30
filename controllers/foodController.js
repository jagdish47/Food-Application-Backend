import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";

export const createFoodController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide all fields" });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    await newFood.save();

    res
      .status(200)
      .send({ success: true, message: "Successfully Stored Data", newFood });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Create Food API" });
  }
};

export const getAllFoodController = async (req, res, next) => {
  try {
    const Foods = await foodModel.find();

    if (!Foods) {
      return res
        .status(404)
        .send({ success: false, message: "Food Not Found" });
    }

    return res.status(200).send({
      success: true,
      message: "Successfully God Food",
      TodalFood: Foods.length,
      Foods,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Get Food API" });
  }
};

export const getSingleFoodController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide Id of Restaurant" });
    }

    const food = await foodModel.find({ _id: id });

    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food Not Found" });
    }

    return res
      .status(200)
      .send({ success: true, message: "Successfully Got The Food Item", food });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Get Single Food API", error });
  }
};

export const updateFoodController = async (req, res, send) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide Id of Restaurant" });
    }

    const { title, description, price, isAvailable } = req.body;

    const food = await foodModel.findById(id);

    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food Not Found" });
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { title, description, price, isAvailable },
      { new: true, runValidators: true }
    );

    return res.status(200).send({
      success: true,
      message: "Updated Food Successfully",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Update Food API" });
  }
};

export const deleteFoodController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide Id" });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food Not Found" });
    }

    const checkStatus = await foodModel.deleteOne({ _id: id });

    return res.status(200).send({
      success: true,
      message: "Food Deleted Successfully",
      deletedFood: food,
      checkStatus,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error In Delete Food API", error });
  }
};

//ORDER CONTROLLERS

export const placeOrderController = async (req, res, next) => {
  try {
    const { cart, payment } = req.body;

    if (!cart || !payment) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Food Cart or Payment Method",
      });
    }

    let total = 0;

    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    return res
      .status(201)
      .send({ success: true, message: "Order Placed successfully", newOrder });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Place Order API", error });
  }
};

export const orderStatusController = async (req, res, next) => {
  try {
    const orderId = req.body.id;

    if (!orderId) {
      return res
        .status(404)
        .send({ success: false, message: "Please Provide valid order ID" });
    }

    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    return res
      .status(200)
      .send({ success: false, message: "Order Status Updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Order Status API", error });
  }
};
