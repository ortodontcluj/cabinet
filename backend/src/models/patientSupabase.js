const supabase = require('../supabaseClient');

// Creează pacient
async function addPatient({ name, email, phone, organization_id }) {
  const { data, error } = await supabase
    .from('patients')
    .insert([{ name, email, phone, organization_id }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează pacienții din organizație
async function listPatients(organization_id) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

module.exports = {
  addPatient,
  listPatients,
};
