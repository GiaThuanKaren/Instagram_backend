const Post = require("../../models/Post");
const MSG = require("../../utils/constant");
const { uploadMultipleFile, DeleteFile } = require("../upload/upload.service");

const createNewPost = async function (
  description,
  ArrayBufferImage,
  IdFolderDrive
) {
  try {
    let ArrayIdMedia = await uploadMultipleFile(
      ArrayBufferImage,
      IdFolderDrive
    );
    new Post({
      title: "Default title",
      descripttion: description,
      media: ArrayIdMedia.data,
    }).save();
    return MSG("Created New Post Sucessfully", IdFolderDrive);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateUserPost = async function () {};

const delteUserPost = async function (IDPost) {
  try {
    let PostFound = await Post.findById(IDPost);

    console.log(PostFound, IDPost);
    PostFound.media.forEach(async (item) => {
      await DeleteFile(item);
    });
    await Post.findByIdAndDelete(IDPost);
    // let result =
    return MSG("Deleted Post");
  } catch (e) {
    throw e;
  }
};

module.exports = { createNewPost, updateUserPost, delteUserPost };
