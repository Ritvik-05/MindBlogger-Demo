const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    heading : String,
    image: String,
    content: String,
    userid : String,
    username: String
})

const Blog = mongoose.model("blog" , userModel)

module.exports = Blog;