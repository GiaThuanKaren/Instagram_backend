const MSG = require("../../utils/constant");
const User = require("../../models/User");

const InsertUser = async function (
  UserName,
  email,
  foldername,
  password,
  folderId
) {
  try {
    const NewUserModel = new User({
      UserName,
      email,
      password,
    });
    await NewUserModel.save();

    return MSG("Succesfully", null, null);
  } catch (e) {
    console.log(e);
    return MSG("Failed", null, null);
  }
};

const UpdateUser = async function (Condition, Data) {
  try {
    await User.findOneAndUpdate(Condition, {
      $set: Data,
    });
    return MSG("Succesfully", null, null);
  } catch (e) {
    console.log(e);
    return MSG("Failed", null, null);
  }
};
module.exports = { InsertUser, UpdateUser };
