const router = require("express").Router();
const {
  uploadFile,
  GetFile,
  removeFile,
  listAllFiles,
} = require("../controllers/upload-controller");
const checkUserRole = require("../middlewares/checkUserRole");
const tokenVerification = require("../middlewares/tokenverification");
const upload = require("../middlewares/upload");

router.post(
  "/",
  [tokenVerification, checkUserRole, upload.single("file")],
  uploadFile
);
router.get("/:filename", [tokenVerification], GetFile);
router.delete("/:filename", [tokenVerification, checkUserRole], removeFile);
router.get("/", listAllFiles);

module.exports = router;
