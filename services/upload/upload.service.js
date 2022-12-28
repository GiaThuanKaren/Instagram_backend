const multer = require("multer");
const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();
var fs = require("fs");
const { Readable } = require("stream");
const MSG = require("../../utils/constant");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEYFILEPATH = `${__dirname}/private.json`;
const upload = multer();
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const BufferToStream = function (buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

const UploadFileSingleFile = async function (
  PathImageOrBuffer,
  IdFolder,
  FileName,
  MinType
) {
  const driveService = google.drive({ version: "v3", auth });
  let fileMetadata = {
    name: FileName,
    parents: [IdFolder], //Optional and make sure to replace with your folder id.
  };

  let media = {
    mimeType: MinType,
    // body: fs.createReadStream(`images/${file}`),
    // body: fs.createReadStream(PathImage),
    body: BufferToStream(PathImageOrBuffer),
  };

  const task = driveService.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
    // requestBody:{
    //   role:'reader',
    //   type:'anyone'
    // }
  });

  try {
    let respone = await task;
    return MSG("Upload File Succesfully", null, respone.data.id, "OK");
  } catch (e) {
    console.log(e);
    return MSG("Failed To Upload File ", "", "", "NO");
  }
};

const CreateNewFolder = async function (NameFolder) {
  const driveService = google.drive({ version: "v3", auth });
  const fileMetadata = {
    name: `_${NameFolder.replace(/ /g, "")}_`,
    mimeType: "application/vnd.google-apps.folder",
    parents: ["1UGW7yzzc4FU9owMLPI8gLyeCRSGSSYZH"], //Optional and make sure to replace with your folder id.
  };
  try {
    const file = await driveService.files.create({
      resource: fileMetadata,
      fields: "id",
    });
    console.log("Folder Id:", file.data.id);
    return MSG("Succesfully", "", file.data.id, "", "OK");
  } catch (e) {
    return MSG("Failed", "", "", "NO");
  }
};

const uploadMultipleFile = async function (PathArrImageOrBuffer, IdFolder) {
  const driveService = google.drive({ version: "v3", auth });
  const ArrIdFielUploaded = [];
  for (let i of PathArrImageOrBuffer) {
    let fileMetadata = {
      name: i.name,
      parents: [IdFolder], //Optional and make sure to replace with your folder id.
    };
    let media = {
      mimeType: i.mimetype,
      // body: fs.createReadStream(`images/${file}`),
      // body: fs.createReadStream(PathImage),
      body: BufferToStream(i.buffer),
    };

    const task = driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
      // requestBody:{
      //   role:'reader',
      //   type:'anyone'
      // }
    });

    try {
      let respone = await task;
      ArrIdFielUploaded.push(respone.data.id);
    } catch (e) {
      return MSG("Failed To Upload File ", "", "", "NO");
    }
  }
  return MSG("Upload File Succesfully", null, ArrIdFielUploaded, "OK");
};

module.exports = { UploadFileSingleFile, CreateNewFolder, uploadMultipleFile };
