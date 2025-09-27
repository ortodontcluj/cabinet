const express = require('express');
const router = express.Router();
const { reportWorks, reportMaterials } = require('../models/reportSupabase');
const requireRole = require('../middleware/roleMiddleware');

// Rapoarte lucrări (Owner, Manager)
router.get('/works', requireRole(['owner', 'manager']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const works = await reportWorks(organization_id);
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rapoarte consum materiale (Owner, Manager)
router.get('/materials', requireRole(['owner', 'manager']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const materials = await reportMaterials(organization_id);
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
