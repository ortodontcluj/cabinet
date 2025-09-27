const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const requireRole = require('../middleware/roleMiddleware');

// Listare useri din organizația ownerului
router.get('/', requireRole(['owner']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('organization_id', organization_id);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modificare user (doar owner)
router.put('/:id', requireRole(['owner']), async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ștergere user (doar owner)
router.delete('/:id', requireRole(['owner']), async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
