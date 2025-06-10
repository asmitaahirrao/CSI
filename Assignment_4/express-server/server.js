const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/hello', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/greet', (req, res) => {
  const name = req.body.name || 'Stranger';
  res.send(`Greetings, ${name}!`);
});

// 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});