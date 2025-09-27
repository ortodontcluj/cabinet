const express = require('express');
const router = express.Router();
const { addPatient, listPatients } = require('../models/patientSupabase');
const requireRole = require('../middleware/roleMiddleware');

// Creează pacient (Medic, Asistent)
router.post('/', requireRole(['medic', 'asistent']), async (req, res) => {
  const { name, email, phone } = req.body;
  const organization_id = req.user.organization_id;
  try {
    const patient = await addPatient({ name, email, phone, organization_id });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează pacienții din organizație (Medic, Asistent, Owner)
router.get('/', requireRole(['medic', 'asistent', 'owner']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const patients = await listPatients(organization_id);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
