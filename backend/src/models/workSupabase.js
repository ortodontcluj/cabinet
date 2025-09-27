const supabase = require('../supabaseClient');

// Creează o categorie de lucrări
async function addWorkCategory({ name, organization_id }) {
  const { data, error } = await supabase
    .from('work_categories')
    .insert([{ name, organization_id }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează categoriile de lucrări
async function listWorkCategories(organization_id) {
  const { data, error } = await supabase
    .from('work_categories')
    .select('*')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

// Creează o lucrare
async function addWork({ name, price, category_id, organization_id }) {
  const { data, error } = await supabase
    .from('works')
    .insert([{ name, price, category_id, organization_id }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează lucrările
async function listWorks(organization_id) {
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

module.exports = {
  addWorkCategory,
  listWorkCategories,
  addWork,
  listWorks,
};
