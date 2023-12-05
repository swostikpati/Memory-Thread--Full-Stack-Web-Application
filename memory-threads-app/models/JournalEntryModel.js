// JournalEntry.js
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

const { Schema } = mongoose;

const journalEntrySchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: 'User'},
  title: { type: String },
  content: { type: String },
  specialLink: { type: String },
  image: { type: String },
  dateCreated: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  isArchived: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

// Sanitize inputs before saving
journalEntrySchema.pre("save", function (next) {
  sanitizeEntry(this);
  next();
});

// Sanitize inputs before updating
journalEntrySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Sanitize each path in the update object
  Object.keys(update).forEach((path) => {
    if (update[path]) {
      update[path] = sanitize(update[path]);
    }
  });

  next();
});

// Helper function to sanitize journal entry data
function sanitizeEntry(entry) {
  Object.keys(journalEntrySchema.paths).forEach((path) => {
    if (journalEntrySchema.paths.hasOwnProperty(path) && entry[path]) {
      entry[path] = sanitize(entry[path]);
    }
  });
}

export default mongoose.models.JournalEntry ||
  mongoose.model("JournalEntry", journalEntrySchema);
