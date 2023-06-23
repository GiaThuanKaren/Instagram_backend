const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Following = new Schema({
    idUser: {
        type: String
    },
    idUserFollowing: {
        type: Array
    }
}, {
    collection: "FollowingUser"
})
module.exports = mongoose.model("FollowingUser", Following);
