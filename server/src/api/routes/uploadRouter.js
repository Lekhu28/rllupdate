const express = require("express");
const router = express.Router();
const path = require('path');


const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./../client/app/src/assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toLocaleDateString().replace(/\//g, "") + "-" +
      new Date().toLocaleTimeString('it-IT').replace(/:/g, "") + "-" +
      file.originalname
    );
  },
});

const upload = multer({ storage: storage }).single("file");

router.post(
  "",
  upload,
  function(request, response, next) {
    
    const file = request.file.filename;

    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    
    response.json({"image": request.file.filename})
  }
);

module.exports = router;
