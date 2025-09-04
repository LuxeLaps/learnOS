const express = require('express');
const app = express();
const port = 5000; // You can choose any available port

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});