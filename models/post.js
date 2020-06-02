const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
    image: {
        type: String,
        required: true,
        default: "https://techexclusive.net/wp-content/uploads/2018/01/Royalty-Free-Images.jpg"
    },
    description: {
        type: String,
        trim: true,
    },
    post_name: {
        type: String,
        required: true,
        trim: true,
    },
    poster: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    date_created: {
        type: Date,
        default: Date.now,
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;