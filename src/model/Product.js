import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, 
  subCategory: { type: String }, 
  images: [{ type: String }],
  specifications: {
    metal: { type: String },
    weight: { type: String },
    carat: { type: String },
    diamondQuality: { type: String },
    movement: { type: String }, 
  },
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

// Next.js fix: Pehle check karo model bana hua hai ya nahi
export default mongoose.models.Product || mongoose.model('Product', productSchema);