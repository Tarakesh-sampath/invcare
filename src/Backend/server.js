// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000; // Or any port you prefer

app.use(bodyParser.json());

// Endpoint to handle login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Validate user credentials (simple example)
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
