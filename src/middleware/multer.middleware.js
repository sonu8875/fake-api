import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("./upload")) {
      fs.mkdirSync("./upload");
    }

    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    const uniqueFileName = Date.now() + "-" + file.originalname;

    cb(null, uniqueFileName);
  },
});

const upload = multer({
  storage,
});

export default upload;