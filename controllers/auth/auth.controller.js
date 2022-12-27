const AuthController = {
  Register: async function (req, res, next) {
    const BodyReq = req.body;
    console.log(BodyReq);
    
    // Inser new user
    const NewUserModel = {
      UserName: BodyReq.UserName,
      email: BodyReq.email,
      foldername: "",
      password: "",
      folderId: "",
    };
  },
};


module.exports = AuthController
