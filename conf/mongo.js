const mongoose = require("mongoose");
const url =
  "mongodb+srv://instagram:giathuan123456@cluster0.a6cyoli.mongodb.net/instagram?retryWrites=true&w=majority";
const Connnection = async function () {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (e) {
    await mongoose.disconnect();
    console.log("DB connect failed");
    console.log(e);
    throw e;
  }
};

module.exports = { Connnection };
