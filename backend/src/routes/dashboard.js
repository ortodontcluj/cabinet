const express = require('express');
const router = express.Router();
const requireRole = require('../middleware/roleMiddleware');

// Dashboard Manager
router.get('/manager', requireRole(['manager']), (req, res) => {
  res.json({ message: 'Dashboard Manager' });
});

// Dashboard Medic
router.get('/medic', requireRole(['medic']), (req, res) => {
  res.json({ message: 'Dashboard Medic' });
});

// Dashboard Asistent
router.get('/asistent', requireRole(['asistent']), (req, res) => {
  res.json({ message: 'Dashboard Asistent' });
});

module.exports = router;
