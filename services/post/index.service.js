const mongoose = require("mongoose")
const Comment = require("../../models/Comment");
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
    await findByIdAndDelete(IDPost);
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
    console.log(error)

    throw error
  }
}


const getAllUserPost = async function (id) {
  try {
    console.log(id)
    // let GetAllUserPost1 = await Post.aggregate([
    //   {
    //     $match: {
    //       authorid:id
    //     }
    //   },

    // ]).exec();
    let GetAllUserPost = await Post.find({ authorid: id })
    return MSG("Done", null, GetAllUserPost)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const insertNewComment = async function (IDPost, IDUserComment, Message, parentID = "") {
  try {
    if (parentID == "") {
      let NewComment = await new Comment({
        content: Message,
        parentCommentID: "",
        postId: IDPost,
        authorId: IDUserComment
      }).save();
      return NewComment;
    } else {
      let NewCommentReplied = await Post.findByIdAndUpdate(parentID, {
        $addToSet: {
          replies: await new Comment({
            content: Message,
            parentCommentID: parentID,
            postId: IDPost,
            authorId: IDUserComment
          }).save()
        }
      }, {
        new: true
      })
      return NewCommentReplied;
    }
  } catch (e) {
    throw e
  }

}


const getAllCommentInPost = async function (postId) {
  try {
    let query = {
      parentCommentID: "",
      postId: postId
    }
    const aggregate = mongoose.model("Comment").aggregate();
    aggregate.match(query)
    aggregate.lookup({
      from: "User",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
    })
    let result = await aggregate.exec();
    return MSG("", "Done", result)
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getRepliedComment = async function (postid, parentCommentID) {
  try {
    let query = {
      parentCommentID: parentCommentID,
      postId: postid
    }
    const aggregate = mongoose.model("Comment").aggregate();
    aggregate.match(query)
    aggregate.lookup({
      from: "User",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
    })
    let result = await aggregate.exec();
    return MSG("Done", "", result)
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = { getRepliedComment, getAllCommentInPost, insertNewComment, getAllUserPost, getAllPost, createNewPost, updateUserPost, delteUserPost };
