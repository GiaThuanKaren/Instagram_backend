const {
  createNewPost,
  delteUserPost,
  updateUserPost,
  getAllPost,
} = require("../../services/post/index.service");
const MSG = require("../../utils/constant");

const PostController = {
  createNewPost: async function (req, res, next) {

    const BodyClient = req.body;
    try {
      const ListFiles = req.files;
      console.log(ListFiles);
      if (!ListFiles) {
        return res.json(MSG("Failed To Create Post . Updload File Failed"));
      }

      const ArrBuffer = ListFiles?.map((item, index) => {
        return {
          buffer: item.buffer,
          minetype: item.mimetype,
          name: item["originalname"],
        };
      });
      let result = await createNewPost(
        BodyClient["description"],
        BodyClient["authorId"],
        ArrBuffer,
        "1mzDJKk-gIyZJ4vPm6sz3jeACqNye3cK4"
      );
      res.json(result);
    } catch (e) {
      res.json(MSG("Failed To Create Post"));
    }
  },
  updateUserPost: async function (req, res, next) {
    const BodyClient = req.body;
    console.log(BodyClient);
    try {
      const IdPost = BodyClient["Idpost"];
      const BodyClienFile = req.files;
      const description = BodyClient["description"];
      const media = BodyClienFile ? BodyClienFile : [];
      const OldMedia = BodyClient["oldmedia"];
      console.log(
        BodyClient["oldmedia"],
        Array.isArray(BodyClient["oldmedia"]),
        Array.isArray(media),
        media?.length,
        OldMedia?.length
      );
      const BufferMedia = media?.map((item, index) => {
        return {
          name: item["originalname"],
          buffer: item["buffer"],
          mimetype: item["mimetype"],
        };
      });
      let result = await updateUserPost(
        IdPost,
        description,
        BufferMedia,
        OldMedia
      );
      res.json(MSG(result.msg, result.others));
    } catch (e) {
      console.log(e);
      res.json(MSG("Failed To Update This Post"));
    }
  },
  deleteUserPost: async function (req, res, next) {
    const BodyClient = req.body;
    try {
      const IdFile = BodyClient["idFile"];
      let result = await delteUserPost(IdFile);
      res.json(MSG(result.msg));
    } catch (e) {
      console.log(e);
      res.json(MSG("Failed To Delete This Post , Please Try Again "));
    }
  },
  getAllPost: async function (req, res, next) {
    try {
      const BodyClient = req.body;
      let result = await getAllPost();
      return res.json(result)
    } catch (error) {

      return res.json(MSG("Failed To Get All Post , Please Refresh"));
    }
  }
  ,
  getAllCommentInPost: async function (req, res, next) {
    const BodyClient = req.body;
  },
  getCommentByIdParent: async function (req, res, next) {
    const BodyClient = req.body;
  },
};

module.exports = PostController;
