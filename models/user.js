const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    date_created: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;