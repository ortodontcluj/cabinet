const supabase = require('../supabaseClient');

// Adaugă consum materiale la lucrare
async function addWorkMaterial({ work_id, material_id, quantity }) {
  const { data, error } = await supabase
    .from('work_materials')
    .insert([{ work_id, material_id, quantity }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează materialele folosite la o lucrare
async function listWorkMaterials(work_id) {
  const { data, error } = await supabase
    .from('work_materials')
    .select('*')
    .eq('work_id', work_id);
  if (error) throw error;
  return data;
}

module.exports = {
  addWorkMaterial,
  listWorkMaterials,
};
