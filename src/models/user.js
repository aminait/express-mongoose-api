import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import config from '@src/config';
import UserRoles from './userRoles';

const UserSchema = mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    username: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.User,
    },
    isVolunteer: {
      type: Boolean,
      default: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    city: { type: String },
    country: { type: String },
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
UserSchema.plugin(passportLocalMongoose);

// UserSchema.virtual('isVerified').get(() => !!(this.verified || this.passwordReset));

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.id;
    delete ret.salt;
    delete ret.hash;
  },
});

UserSchema.methods.generateVerificationToken = () =>
  jwt.sign({ id: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.expiryDays,
    algorithm: 'RS256',
  });

const DetailsSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export const validateUserDetails = (user) => DetailsSchema.validate(user);
export default mongoose.model('User', UserSchema);
