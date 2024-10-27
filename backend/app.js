const express = require('express');
const cors = require('cors');
const app = express();
const analyzeRoutes = require('./routes/analyzeRoutes');

// Middleware to parse JSON and serve static files
app.use(cors());

app.use(express.json());
//app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Use routes for image analysis and Nutri-Score calculation
app.use('/api/v1/analyze', analyzeRoutes);

module.exports = app;
