const supabase = require('../supabaseClient');

// Creează o programare
async function addAppointment({ patient_id, user_id, scheduled_at, notes }) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([{ patient_id, user_id, scheduled_at, notes }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează programările pentru un medic
async function listAppointmentsForUser(user_id) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', user_id);
  if (error) throw error;
  return data;
}

// Listează programările pentru o organizație
async function listAppointmentsForOrganization(organization_id) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, user_id, patient_id')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

module.exports = {
  addAppointment,
  listAppointmentsForUser,
  listAppointmentsForOrganization,
};
