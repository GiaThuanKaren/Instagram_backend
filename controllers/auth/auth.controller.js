const {
  InsertUser,
  FindOneUser,
  UpdateUser,
} = require("../../services/auth/auth.service");
const { CreateNewFolder } = require("../../services/upload/upload.service");
const MSG = require("../../utils/constant");

const AuthController = {
  Register: async function (req, res, next) {
    const BodyReq = req.body;
    console.log(BodyReq);
    const CheckUser = await FindOneUser({
      email: BodyReq.email.toLowerCase(),
    });

    // Inser new user
    const NewUserModel = {
      UserName: BodyReq.UserName,
      email: BodyReq.email,
      foldername: "",
      password: BodyReq.password,
      folderId: "",
    };
    const result = await InsertUser(
      BodyReq.UserName,
      BodyReq.email.toLowerCase(),
      "",
      BodyReq.password,
      ""
    );
    console.log(result);
    res.json(result);
  },

  Login: async function (req, res, next) {
    const BodyReq = req.body;
    console.log(BodyReq, Date.now());
    const CheckUser = await FindOneUser({
      email: BodyReq.email.toLowerCase(),
    });

    if (!CheckUser)
      return res.json(
        MSG(
          "Not Found Account By This Gmail/Email, Please Regist",
          "",
          "",
          "NO"
        )
      );
    if (CheckUser.data.password != BodyReq.password)
      return res.json(MSG("Password is not correct", "", "", "NO"));

    console.log(CheckUser, "123123");
    const IdNewFolder = await CreateNewFolder(CheckUser.data.UserName);
    console.log(IdNewFolder.data);
    try {
      const result = await UpdateUser(
        {
          email: CheckUser.data.email,
        },
        {
          key: `_${Date.now()}_`,
          foldername: `_${CheckUser.data.UserName.replace(/ /g, "")}_`,
          folderId: IdNewFolder.data,
        }
      );
      res.json(result);
    } catch (e) {
      console.log(e);
    }

    // res.send("This is Login Route");
  },
};

module.exports = AuthController;
