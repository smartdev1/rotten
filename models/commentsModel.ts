import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
export default Comment;