const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const image = Math.random() * 10000 + Date.now() + "." + file.originalname;
    cb(null, image);
  },
});

const upload = multer({ storage });

module.exports = upload;
