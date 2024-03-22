
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const profileModel = new mongoose.Schema({
    username: {
        type: String,
        minlength: [6, "Username must have at least 6 characters"],
        required: [true, "Username field cannot be empty"],
    },
    password: {
        type: String,
        // minlength: [6, "Password must have at least 6 characters"],
        // maxlength: [10, "Password must have at most 10 characters"],
        // required: [true, "Password field cannot be empty"],
    },
    email: {
        type: String,
        required: [true, "Email field cannot be empty"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
});

profileModel.plugin(plm , {usernameField : 'email'});

const Profile = mongoose.model("Profile", profileModel);

module.exports = Profile;
