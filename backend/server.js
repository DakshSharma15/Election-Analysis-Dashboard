const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/analysisRoutes');

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', routes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
