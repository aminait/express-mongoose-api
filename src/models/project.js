import mongoose from 'mongoose';
import projectStatus from './projectStatus';

const { Schema } = mongoose;

const ProjectSchema = Schema(
  {
    organizer: { type: Schema.Types.ObjectId, ref: 'Organization' },
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

export default mongoose.model('Project', ProjectSchema);
