import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  name: {
    type: String,
  },
  shortName: {
    type: String,
  },
});

export default mongoose.model("Category", CategorySchema);
