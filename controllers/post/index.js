const {
  createNewPost,
  delteUserPost,
} = require("../../services/post/index.service");
const MSG = require("../../utils/constant");

const PostController = {
  createNewPost: async function (req, res, next) {
    const BodyClient = req.body;

    try {
      const ListFiles = req.files;
      console.log(ListFiles);

      const ArrBuffer = ListFiles?.map((item, index) => {
        return {
          buffer: item.buffer,
          minetype: item.mimetype,
          name: item["originalname"],
        };
      });
      let result = await createNewPost(
        BodyClient["description"],
        ArrBuffer,
        BodyClient["IdFolderDrive"]
      );
      res.json(MSG(result.msg));
    } catch (e) {
      res.json(MSG("Failed To Create Post"));
    }
  },
  updateUserPost: async function (req, res, next) {
    const BodyClient = req.body;
  },
  deleteUserPost: async function (req, res, next) {
    const BodyClient = req.body;
    try {
      const IdFile = BodyClient["idFile"];

      let result = await delteUserPost(IdFile);
      res.json(MSG(result.msg));
    } catch (e) {
      res.json(MSG("Failed To Delete This Post , Please Try Again "));
    }
  },
  getAllCommentInPost: async function (req, res, next) {
    const BodyClient = req.body;
  },
  getCommentByIdParent: async function (req, res, next) {
    const BodyClient = req.body;
  },
};

module.exports = PostController;
