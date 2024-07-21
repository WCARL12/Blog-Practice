const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogsSchema = new Schema({
    imageURL : {
        type : String,
        required : false
    },
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    
}, { timestamps : true})

const Blog = mongoose.model('abbatek-blogs', blogsSchema)

module.exports = Blog