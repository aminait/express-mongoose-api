import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import config from "@src/config";

const userRoles = {
  superAdmin: "superadmin",
  admin: "admin",
  supervisor: "supervisor",
  user: "user",
};

const UserSchema = mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    username: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.user,
    },
    firstName: { type: String },
    lastName: { type: String },
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
    delete ret.salt;
    delete ret.hash;
  },
});

UserSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.expiryDays,
    algorithm: "RS256",
  });
};

UserSchema.statics.checkExistingField = async (field, value) => {
  const checkField = await User.findOne({ [`${field}`]: value });

  return checkField;
};

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", UserSchema);
