var express = require("express");
var userControle = require("../db/controllers/userControle.js");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./api/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage });
router.route("/").get(function(req, res) {
  userControle.read(req.user, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
router.route("/").put(function(req, res) {
  console.log(req.body);
  userControle.update(req.user.id, req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/image").put(upload.single("image"), function(req, res) {
  userControle.update(
    req.user.id,
    { image: req.file.originalname },
    (err, data) => {
      if (err) {
        throw err;
      }
      res.send(data);
    }
  );
});

module.exports = router;
