const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const productRoutes = require('./express-api-week2/routes/products');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/products', productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
