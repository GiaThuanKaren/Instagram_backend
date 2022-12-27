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
    return MSG("Failed", null, null, "NO");
  }
};

const UpdateUser = async function (Condition, Data) {
  try {
    const result = await User.findOneAndUpdate(Condition, Data, {
      new: true,
    });
    console.log(result, "Updated");
    return MSG("Succesfully", null, result);
  } catch (e) {
    console.log(e);
    return MSG("Failed", null, null, "NO");
  }
};

const FindOneUser = async function (condition) {
  try {
    const UserFound = await User.findOne(condition);
    console.log(UserFound);
    if (UserFound) return MSG("Founded", "", UserFound, "OK");
    else return MSG(" Not Found", "", null, "NO");
  } catch (e) {
    console.log("Error to find User");
    return MSG("Failed", null, null, "NO");
  }
};

module.exports = { InsertUser, UpdateUser, FindOneUser };
