const supabase = require('../supabaseClient');

// Creează o organizație nouă
async function addOrganization({ name }) {
  const { data, error } = await supabase
    .from('organizations')
    .insert([{ name }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează toate organizațiile
async function listOrganizations() {
  const { data, error } = await supabase
    .from('organizations')
    .select('*');
  if (error) throw error;
  return data;
}

module.exports = {
  addOrganization,
  listOrganizations,
};
