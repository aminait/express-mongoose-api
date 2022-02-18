import mongoose from 'mongoose';
import Joi from 'joi';
import projectStatus from './projectStatus';

const { Schema } = mongoose;

const ProjectSchema = Schema(
  {
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: projectStatus,
      default: projectStatus.draft,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    volunteersCount: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
    },
  },
  { timestamps: true }
);

// ProjectSchema.method("calculatePrice", async () => {});

// TODO add toJSON method

// TODO check integer validation

const CreateSchema = Joi.object({
  createdBy: Joi.required(),
  organization: Joi.required(),
  name: Joi.string(),
  summary: Joi.string(),
  description: Joi.string(),
  startTime: Joi.date(),
  endTime: Joi.date(),
  status: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  category: Joi.string().required(),
  volunteersCount: Joi.number(),
  capacity: Joi.number().integer(),
}).options({ abortEarly: false });

export const validateCreateProject = (org) => CreateSchema.validate(org);

export default mongoose.model('Project', ProjectSchema);
