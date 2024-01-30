import restaurantModel from "../models/restaurantModel.js";

//CREATE RESTAURANT
export const createRestaurantController = async (req, res, next) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if ((!title, !imageUrl, !coords)) {
      return res
        .status(500)
        .send({ success: false, message: "All Fields are Required" });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res
      .status(201)
      .send({ success: true, message: "New Restaurant Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Creating Restaurant API",
      error,
    });
  }
};

export const getAllRestaurantController = async (req, res, next) => {
  try {
    const allRestaurant = await restaurantModel.find();

    if (!allRestaurant) {
      return res.status(404).send({
        success: false,
        totalCount: allRestaurant.length,
        message: "Restaurant Not Found",
      });
    }

    return res.status(201).send({
      success: true,
      totalCount: allRestaurant.length,
      message: "Successfully Got Restaurant",
      allRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Restaurant API",
      error,
    });
  }
};

export const getSingleRestaurantController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await restaurantModel.findById({ _id: id });

    if (!restaurant) {
      return res
        .status(404)
        .send({ success: false, message: "Restaurant Not Found" });
    }

    return res.status(200).send({
      success: true,
      message: "Successfully Got Restaurant",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Single Restaurant API",
      error,
    });
  }
};

export const deleteRestaurantController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({ success: false, message: "ID Not Found" });
    }

    const restaurant = await restaurantModel.find({ _id: id });

    if (!restaurant) {
      return res
        .status(500)
        .send({ success: false, message: "Restaurant Not Found" });
    }

    const deletedRestaurant = await restaurantModel.deleteOne({ _id: id });

    return res.status(200).send({
      success: true,
      message: "Successfully Deleted Restaurant",
      restaurant,
      status: deletedRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Delete Restaurant API" });
  }
};
