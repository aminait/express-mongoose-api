import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = Schema({
  parentCategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: {
    type: String,
  },
  shortName: {
    type: String,
  },
});

export default mongoose.model('Category', CategorySchema);
