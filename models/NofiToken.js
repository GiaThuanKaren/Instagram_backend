const mongoose = require("mongoose");
const Schema = mongoose.Schema
const NofiToken = new Schema({
    idUser: {
        type: mongoose.Types.ObjectId
    },
    Token: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("NoftiToken", NofiToken)