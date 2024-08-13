import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  release_date: { type: Date, required: true },
  genre: [String],
  director: { type: String },
  ratings: [RatingSchema],
  average_rating: { type: Number, default: 0 },
}, { timestamps: true });

const Movies = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
export default Movies;
