const { InsertUser } = require("../../services/auth/auth.service");

const AuthController = {
  Register: async function (req, res, next) {
    const BodyReq = req.body;
    console.log(BodyReq);

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
      BodyReq.email,
      "",
      BodyReq.password,
      ""
    );
    console.log(result)
    res.json(result);
  },

  Login: async function (req, res, next) {
    const BodyReq = req.body;
    console.log(BodyReq);
    res.send("This is Login Route");
  },
};

module.exports = AuthController;
