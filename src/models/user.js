import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userRoles = {
  superAdmin: "superadmin",
  admin: "admin",
  supervisor: "supervisor",
  user: "user",
};

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.user,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    imageUrl: { type: String },
    verificationToken: String,
    verified: Date,
    resetToken: {
      token: String,
      expires: Date,
    },
    passwordReset: Date,
  },
  { timestamps: true }
);

UserSchema.virtual("isVerified").get(function () {
  return !!(this.verified || this.passwordReset);
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", UserSchema);
