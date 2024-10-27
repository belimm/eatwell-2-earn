const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');
const upload = require('../config/multerConfig'); // Memory storage multer config

// POST route to handle image upload and analysis
router.post('/image', upload.single('image'), analyzeController.analyzeImage);

module.exports = router;
