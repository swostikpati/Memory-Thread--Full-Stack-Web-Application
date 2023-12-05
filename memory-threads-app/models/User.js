import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  fullName: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
});

// Sanitize inputs before saving
UserSchema.pre("save", function (next) {
  const user = this;
  sanitizeUser(user);
  next();
});

// Sanitize inputs before updating
UserSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Sanitize each path in the update object
  Object.keys(update).forEach((path) => {
    if (update[path]) {
      update[path] = sanitize(update[path]);
    }
  });

  next();
});

// Helper function to sanitize user data
function sanitizeUser(user) {
  Object.keys(UserSchema.paths).forEach((path) => {
    if (UserSchema.paths.hasOwnProperty(path) && user[path]) {
      user[path] = sanitize(user[path]);
    }
  });
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
