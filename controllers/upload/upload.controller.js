const { FindOneUser } = require("../../services/auth/auth.service");
const {
  UploadFileSingleFile, uploadMultipleFile,
} = require("../../services/upload/upload.service");

const UploadController = {
  uploadSingleFile: async function (req, res, next) {
    const FileFromClient = req.file;
    console.log(FileFromClient, FileFromClient.buffer);
    const UserFound = await FindOneUser({
      email: req.body.email,
    });
    console.log(UserFound.data);

    const result = await UploadFileSingleFile(
      FileFromClient.buffer,
      UserFound.data.folderId,
      FileFromClient.originalname,
      FileFromClient.mimetype
    );
    res.json(result);
  },
  uploadMultipleFile: async function (req, res, next) {
    console.log(req.files);
     const UserFound = await FindOneUser({
      email: req.body.email,
    });
    const Files = req.files;
    
    const ArrBuffer = Files.map((item, index) => {
      return {
        buffer:item.buffer,
        mimetype:item.mimetype,
        name:item.originalname
      };
    });
    console.log(ArrBuffer);
    const result = await  uploadMultipleFile(ArrBuffer,UserFound.data.folderId)
    // res.json(ArrBuffer);
    res.json(result)
  },
};

module.exports = UploadController;
