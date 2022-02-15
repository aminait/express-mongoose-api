import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

User.createNew = async (user) => {
  user._id = new mongoose.Types.ObjectId();
  const model = new User(user);
  return model;
};

export default User;
