const multer = require('multer');

// Set up multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
