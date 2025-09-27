const supabase = require('../supabaseClient');

// Adaugă un utilizator nou
async function addUser({ email, password, role, organization_id }) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      { email, password, role, organization_id }
    ])
    .select();
  if (error) throw error;
  return data[0];
}

// Găsește utilizator după email
async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error) throw error;
  return data;
}

module.exports = {
  addUser,
  findUserByEmail,
};
