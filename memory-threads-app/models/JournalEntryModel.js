// JournalEntry.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const journalEntrySchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: 'User'},
  title: { type: String},
  content: { type: String},
  specialLink: { type: String },
  image: { type: String },
  dateCreated: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  isArchived: { type: Boolean, default: false }
});

export default mongoose.models.JournalEntry || mongoose.model('JournalEntry', journalEntrySchema);;
