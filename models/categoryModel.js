import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3MOBy7DpVy4aB-SLUAcE4dDmDcX-lXsJcZ7wX5pAmNw&s",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
