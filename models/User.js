const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    "_id": {
      "$oid": {
        "type": "ObjectId"
      }
    },
    "name": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "email_verified": {
      "type": "Mixed"
    },
    "image": {
      "type": "String"
    },
    "following": {
      "type": Array
    }
  }, {
  collection: "User"
}
);
module.exports = mongoose.model("User", User);
