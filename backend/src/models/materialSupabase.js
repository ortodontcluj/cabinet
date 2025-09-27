const supabase = require('../supabaseClient');

// Creează o categorie de materiale
async function addMaterialCategory({ name, organization_id }) {
  const { data, error } = await supabase
    .from('material_categories')
    .insert([{ name, organization_id }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează categoriile de materiale
async function listMaterialCategories(organization_id) {
  const { data, error } = await supabase
    .from('material_categories')
    .select('*')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

// Creează un material
async function addMaterial({ name, unit, category_id, organization_id, stock }) {
  const { data, error } = await supabase
    .from('materials')
    .insert([{ name, unit, category_id, organization_id, stock }])
    .select();
  if (error) throw error;
  return data[0];
}

// Listează materialele
async function listMaterials(organization_id) {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

// Modifică stocul unui material
async function updateMaterialStock(id, stock) {
  const { data, error } = await supabase
    .from('materials')
    .update({ stock })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

module.exports = {
  addMaterialCategory,
  listMaterialCategories,
  addMaterial,
  listMaterials,
  updateMaterialStock,
};
