const { FindOneUser } = require("../../services/auth/auth.service");
const {
  UploadFileSingleFile,
} = require("../../services/upload/upload.service");

const UploadController = {
  uploadSingleFile: async function (req, res, next) {
    const FileFromClient = req.file;
    console.log(FileFromClient);
    const UserFound = await FindOneUser({
      email: req.body.email,
    });
    console.log(UserFound.data);
    
    // const result = await UploadFileSingleFile(
    //   FileFromClient.buffer,
    //   "",
    //   FileFromClient.originalname,
    //   FileFromClient.mimetype
    // );
    // res.json(result)
  },
  uploadMultipleFile: async function (req, res, next) {},
};

module.exports = UploadController;
