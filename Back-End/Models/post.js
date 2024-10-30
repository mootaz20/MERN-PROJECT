const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : String,
    description : String,
    image : String,
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    category_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment',
    }]
},{timestamps: true})
const Post = new mongoose.model('Post',postSchema);
module.exports = Post;