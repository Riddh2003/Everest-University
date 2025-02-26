require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const app = express();

// Use the CORS middleware
app.use(cors());

// Your existing routes and middleware
app.get('/api/private/admin/getalladmissionsrequest', (req, res) => {
  // Your route handler code
  res.json({ data: "Your data here" });
});

// Start the server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});