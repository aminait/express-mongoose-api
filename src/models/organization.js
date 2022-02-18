import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrganizationSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  imageUrl: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export default mongoose.model('Organization', OrganizationSchema);
