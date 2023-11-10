// User.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
