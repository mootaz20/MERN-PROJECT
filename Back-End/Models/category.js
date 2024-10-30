const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : String
},{timestamps : true})
const Category = new mongoose.model('Category',categorySchema);


module.exports = Category;

