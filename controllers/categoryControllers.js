import categoryModel from "../models/categoryModel.js";

export const createCatController = async (req, res, next) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res
        .status(500)
        .send({ success: false, message: "Title Field Required" });
    }

    const category = new categoryModel({ title, imageUrl });

    if (!category) {
      return res
        .status(500)
        .send({ success: false, message: "Invalid Category Fields" });
    }

    await category.save();

    return res.status(200).send({
      success: true,
      message: "Successfully Created Category",
      category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error In Create Category API", error });
  }
};

export const getAllCatController = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();

    if (!categories) {
      return res
        .status(404)
        .send({ success: false, message: "Categories Not Found" });
    }

    return res.status(200).send({
      success: true,
      message: "Successfully Got Categories",
      totalCategory: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error Get All Category API", error });
  }
};

export const updateCatController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(500)
        .send({ success: false, message: "No Category Found" });
    }

    return res.status(200).send({
      success: true,
      message: "Successfully Updated Category",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Category Update API" });
  }
};

export const deleteCatController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide a Id" });
    }

    const category = await categoryModel.findById(id);

    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found" });
    }

    await categoryModel.findByIdAndDelete(id);

    return res
      .status(200)
      .send({ success: true, message: "Successfully Deleted the Category" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error In Delete Category API", error });
  }
};
