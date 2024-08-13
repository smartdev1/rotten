import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rate: { type: Number, required: true },
  averageRating: { type: Number }
}, { timestamps: true });

const Rating = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);
export default Rating;