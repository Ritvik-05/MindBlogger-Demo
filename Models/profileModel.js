
// const profileModel = new mongoose.Schema({
//     username: {
//         type: String,
//         minLength: [6, "User name must have atleast 6 characters"],
//         required: [true, "Username field can not be empty"],
//     },
//     Password: {
//         type: String,
//         minLength: [6, "Password must have atleast 6 characters"],
//         maxLength: [10, "Password must have atmost 10 characters"],
//         // required: [true, "Password Field can not be empty"],
//     },
//     email: {
//         type: String,
//         required: [true, "E-mail Field can not be empty"],
//         match: [
//             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//             "Please fill a valid email address",
//         ],
//     },

// })



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

// Apply passport-local-mongoose plugin
// profileModel.plugin(plm, {
    //     usernameField: "username", // The field to use as the username
    //     usernameLowerCase: true,   // Convert usernames to lowercase before saving
    //     session: false,            // Disable session support
//     populateFields: "email",   // Field to populate when using req.user
// });

const Profile = mongoose.model("Profile", profileModel);

module.exports = Profile;
