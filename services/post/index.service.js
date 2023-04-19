const Post = require("../../models/Post");
const MSG = require("../../utils/constant");
const { uploadMultipleFile, DeleteFile } = require("../upload/upload.service");

const createNewPost = async function (
  description,
  authorId,
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
      authorid: authorId
    }).save();
    return MSG("Created New Post Sucessfully");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const UpdateMediaUserPost = async function (ArrayMedia) {
  try {
  } catch (e) {
    throw e;
  }
};
const updateUserPost = async function (
  IdPost,
  description,
  ArrayMedia = [],
  OldMedia = []
) {
  try {
    let MediaUpdated = [];
    console.log(IdPost, description, ArrayMedia);
    if (ArrayMedia.length > 0) {
      // Xoa cac file anh ,video cu
      // const OldPost = await Post.findById(IdPost);
      // const OldMedia = OldPost.media;
      // if (OldMedia.length > 0) {
      //   OldMedia.forEach(async (item, index) => {
      //     await DeleteFile(item);
      //   });
      // }
      OldMedia.forEach(async (item, index) => {
        await DeleteFile(item);
      });
      let FilesUpdated = await uploadMultipleFile(ArrayMedia, "1mzDJKk-gIyZJ4vPm6sz3jeACqNye3cK4");
      let PostUpdated = await Post.findByIdAndUpdate(
        IdPost,
        {
          descripttion: description,
          media: FilesUpdated.data,
        },
        {
          new: true,
        }
      );
      return MSG("Updated Post Sucessfully", PostUpdated);
    }
    let PostUpdated = await Post.findByIdAndUpdate(
      IdPost,
      {
        descripttion: description,
      },
      {
        new: true,
      }
    );
    return MSG("Updated Post Sucessfully", PostUpdated);
  } catch (e) {
    throw e;
  }
};

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



const getAllPost = async function () {
  try {
    let GetAllPost = await Post.aggregate([
      {
        $lookup: {
          from: "User",
          localField: "authorid",
          foreignField: "_id",
          as: "author"
        }
      },
    ]).exec();
    return MSG("Done", null, GetAllPost);
  } catch (error) {
    throw error
  }
}

module.exports = { getAllPost, createNewPost, updateUserPost, delteUserPost };
