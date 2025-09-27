const express = require('express');
const router = express.Router();
const {
  addWorkCategory,
  listWorkCategories,
  addWork,
  listWorks,
} = require('../models/workSupabase');
const requireRole = require('../middleware/roleMiddleware');

// Creează categorie de lucrări (Owner)
router.post('/categories', requireRole(['owner']), async (req, res) => {
  const { name } = req.body;
  const organization_id = req.user.organization_id;
  try {
    const category = await addWorkCategory({ name, organization_id });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează categoriile de lucrări (Owner, Medic)
router.get('/categories', requireRole(['owner', 'medic']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const categories = await listWorkCategories(organization_id);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Creează lucrare (Owner)
router.post('/', requireRole(['owner']), async (req, res) => {
  const { name, price, category_id } = req.body;
  const organization_id = req.user.organization_id;
  try {
    const work = await addWork({ name, price, category_id, organization_id });
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează lucrările (Owner, Medic)
router.get('/', requireRole(['owner', 'medic']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const works = await listWorks(organization_id);
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
