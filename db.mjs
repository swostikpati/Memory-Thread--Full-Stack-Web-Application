// db.mjs

import mongoose from 'mongoose';

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    username: String,
    hash: String, // Ensure you're hashing passwords before storing them!
    email: String,
    friendshipGroups: [{ type: Schema.Types.ObjectId, ref: 'FriendshipGroup' }]
});

// FriendshipGroup Schema
const friendshipGroupSchema = new Schema({
    groupName: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    newsletters: [{ type: Schema.Types.ObjectId, ref: 'Newsletter' }]
});

// Newsletter Schema
const newsletterSchema = new Schema({
    friendshipGroup: { type: Schema.Types.ObjectId, ref: 'FriendshipGroup' },
    issueDate: Date,
    prompts: [{
        promptText: String,
        responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }]
    }],
    memories: [{ type: Schema.Types.ObjectId, ref: 'Memory' }]
});

// Response Schema
const responseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    prompt: { type: Schema.Types.ObjectId, ref: 'Prompt' },
    content: String,
    attachments: [String], // URLs or references to media
    createdAt: Date
});

// Memory Schema
const memorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    newsletter: { type: Schema.Types.ObjectId, ref: 'Newsletter' },
    content: String,
    url: String, // URL or a reference to the stored media
    sharedAt: Date
});

// Compile Schemas into Models
const User = mongoose.model('User', userSchema);
const FriendshipGroup = mongoose.model('FriendshipGroup', friendshipGroupSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Response = mongoose.model('Response', responseSchema);
const Memory = mongoose.model('Memory', memorySchema);

// Export the Models
export { User, FriendshipGroup, Newsletter, Response, Memory };
