import mongoose from "mongoose";

const OrganizationSchema = mongoose.Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  imageUrl: { type: String },
});

export default mongoose.model("Organization", OrganizationSchema);
