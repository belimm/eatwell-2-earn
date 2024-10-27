const express = require('express');
const cors = require('cors');
const app = express();
const analyzeRoutes = require('./routes/analyzeRoutes');

const manifest = require('../frontend/tonconnect-manifest.json');

// Middleware to parse JSON and serve static files
app.use(cors());

app.use(express.json());
//app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Use routes for image analysis and Nutri-Score calculation
app.use('/api/v1/analyze', analyzeRoutes);

app.get('/api/v1/ton/manifest', (req, res) => {
   res.json({
      ...manifest,
   });
});

module.exports = app;
