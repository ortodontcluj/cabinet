const express = require('express');
const router = express.Router();
const {
  addAppointment,
  listAppointmentsForUser,
  listAppointmentsForOrganization,
} = require('../models/appointmentSupabase');
const requireRole = require('../middleware/roleMiddleware');

// Creează programare (Asistent, Medic)
router.post('/', requireRole(['asistent', 'medic']), async (req, res) => {
  const { patient_id, user_id, scheduled_at, notes } = req.body;
  try {
    const appointment = await addAppointment({ patient_id, user_id, scheduled_at, notes });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează programările pentru medicul curent (Medic)
router.get('/me', requireRole(['medic']), async (req, res) => {
  const user_id = req.user.id;
  try {
    const appointments = await listAppointmentsForUser(user_id);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listează programările pentru organizație (Owner, Manager, Asistent)
router.get('/organization', requireRole(['owner', 'manager', 'asistent']), async (req, res) => {
  const organization_id = req.user.organization_id;
  try {
    const appointments = await listAppointmentsForOrganization(organization_id);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
