const express = require('express');
const router = express.Router();
const { createUser, findUserByEmail } = require('../models/user');
const { hashPassword, comparePassword, generateToken } = require('../auth');

// Register route
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ error: 'User already exists' });
  const hashed = await hashPassword(password);
  const user = await createUser({ email, password: hashed, role });
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'User not found' });
  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

module.exports = router;
