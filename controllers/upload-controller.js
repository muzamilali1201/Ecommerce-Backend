const Upload = require("../models/Upload");
const customError = require("../utils/error");
const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res) => {
  const file = req.file;
  const title = req.body.title;
  // console.log(title, "The file : ", file);
  const url = `localhost:3000/public/uploads/${file.filename}`;
  const fileToUpload = await Upload.create({
    name: file.filename,
    title: title,
    url: url,
  });
  if (fileToUpload) {
    res.status(200).json({ message: "File uploaded successfully!" });
    return;
  }
  throw new customError(500, "Something went wrong");
};

const GetFile = async (req, res) => {
  const filename = req.params.filename;
  const searchedFile = await Upload.findOne({ name: filename });
  if (searchedFile) {
    res.status(200).json({ searchedFile: searchedFile });
    return;
  }
  throw new customError(500, "File doesn't exist!");
};

const removeFile = async (req, res) => {
  const filename = req.params.filename;
  const fileToDel = await Upload.findOneAndDelete({ name: filename });
  console.log(filename);
  const filePath = path.join(__dirname, `../public/uploads/${filename}`);
  if (fileToDel) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json({ message: "File deleted successfully" });
    return;
  }
  throw new customError(500, "Something went wrong");
};

const listAllFiles = async (req, res) => {
  const files = await Upload.find();
  if (files) {
    res.status(200).json({ Files: files });
    return;
  }
  throw new customError(500, "Something went wrong");
};

module.exports = { uploadFile, GetFile, removeFile, listAllFiles };
