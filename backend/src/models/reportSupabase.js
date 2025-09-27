const supabase = require('../supabaseClient');

// Rapoarte lucrări pentru organizație
async function reportWorks(organization_id) {
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

// Rapoarte consum materiale pentru organizație
async function reportMaterials(organization_id) {
  const { data, error } = await supabase
    .from('work_materials')
    .select('*')
    .eq('organization_id', organization_id);
  if (error) throw error;
  return data;
}

module.exports = {
  reportWorks,
  reportMaterials,
};
