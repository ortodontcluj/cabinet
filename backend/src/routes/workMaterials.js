const express = require('express');
const router = express.Router();
const { addWorkMaterial, listWorkMaterials } = require('../models/workMaterialSupabase');
const requireRole = require('../middleware/roleMiddleware');

// Adaugă consum materiale la lucrare (Medic)
router.post('/', requireRole(['medic']), async (req, res) => {
  const { work_id, material_id, quantity } = req.body;
  try {
    const wm = await addWorkMaterial({ work_id, material_id, quantity });
    res.json(wm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează materialele folosite la o lucrare (Medic, Owner)
router.get('/:work_id', requireRole(['medic', 'owner']), async (req, res) => {
  const { work_id } = req.params;
  try {
    const materials = await listWorkMaterials(work_id);
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
