const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text : String,
    post_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{timestamps : true})
const Comment = new mongoose.model('Comment',commentSchema);


module.exports = Comment;

