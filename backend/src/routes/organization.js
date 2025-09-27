const express = require('express');
const router = express.Router();
const { addOrganization, listOrganizations } = require('../models/organizationSupabase');
const requireRole = require('../middleware/roleMiddleware');

// Creează organizație (doar superadmin)
router.post('/', requireRole(['superadmin']), async (req, res) => {
  const { name } = req.body;
  try {
    const org = await addOrganization({ name });
    res.json(org);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează organizații (doar superadmin)
router.get('/', requireRole(['superadmin']), async (req, res) => {
  try {
    const orgs = await listOrganizations();
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
