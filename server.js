const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory user store (gets reset on server restart)
const users = [];

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// ✅ Signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  // Add user to "database"
  users.push({ name, email, password });
  return res.status(201).json({ message: 'Registered successfully' });
});

// ✅ Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find user and validate credentials
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return res.status(200).json({ message: 'Login successful!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
