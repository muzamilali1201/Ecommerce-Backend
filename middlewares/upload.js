const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const uniquesuffix = Date.now().toString();
    cb(null, uniquesuffix + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = upload;
