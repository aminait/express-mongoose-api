import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

const OrganizationSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  organizers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: { type: String, required: true },
  imageUrl: { type: String },
  city: { type: String },
  country: { type: String, required: true },
});

const CreateSchema = Joi.object({
  name: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
}).options({ abortEarly: false, presence: 'required' });

export const validateCreateOrg = (org) => CreateSchema.validate(org);
export default mongoose.model('Organization', OrganizationSchema);
