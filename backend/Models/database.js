const mongoose = require("mongoose");

mongoose
    // .connect("mongodb://127.0.0.1:27017/MindBlogger")
    .connect("mongodb+srv://agrawalritvik05:RkMctN9kgU5qWqDq@mindbloggercluster0.uzyhopg.mongodb.net/")
    .then(() => console.log("db connected!"))
    .catch((err) => console.log(err));
