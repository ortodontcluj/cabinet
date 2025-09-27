const express = require('express');
const router = express.Router();
const {
  addMaterialCategory,
  listMaterialCategories,
  addMaterial,
  listMaterials,
  updateMaterialStock,
} = require('../models/materialSupabase');
const requireRole = require('../middleware/roleMiddleware');

// Creează categorie de materiale (Owner)
router.post('/categories', requireRole(['owner']), async (req, res) => {
  const { name } = req.body;
  const organization_id = req.user.organization_id;
  try {
    const category = await addMaterialCategory({ name, organization_id });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează categoriile de materiale (Owner, Manager)
router.get('/categories', requireRole(['owner', 'manager']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const categories = await listMaterialCategories(organization_id);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Creează material (Owner)
router.post('/', requireRole(['owner']), async (req, res) => {
  const { name, unit, category_id, stock } = req.body;
  const organization_id = req.user.organization_id;
  try {
    const material = await addMaterial({ name, unit, category_id, organization_id, stock });
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează materialele (Owner, Manager)
router.get('/', requireRole(['owner', 'manager']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const materials = await listMaterials(organization_id);
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifică stocul materialului (Owner)
router.put('/:id/stock', requireRole(['owner']), async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  try {
    const material = await updateMaterialStock(id, stock);
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
