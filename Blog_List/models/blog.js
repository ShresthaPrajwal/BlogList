const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments: {
        type: [String], // Array of strings
        default: []
    }
})

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog; 