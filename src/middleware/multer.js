const multer = require("multer");
const path = require("path");

/**
 * Defines storage location for multer (image processing middleware) - local folder `uploads`
 */
const storage = multer.diskStorage({
  destination: "./uploads",
  // define filename for saved image files
  filename: (req, file, callback) => {
    callback(
      null,
      `${req.user.firstname}-${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload };
