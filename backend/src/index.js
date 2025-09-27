const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);
const workMaterialsRoutes = require('./routes/workMaterials');
app.use('/api/work-materials', workMaterialsRoutes);
const reportsRoutes = require('./routes/reports');
app.use('/api/reports', reportsRoutes);
const patientsRoutes = require('./routes/patients');
app.use('/api/patients', patientsRoutes);
const appointmentsRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentsRoutes);
const worksRoutes = require('./routes/works');
app.use('/api/works', worksRoutes);
const materialsRoutes = require('./routes/materials');
app.use('/api/materials', materialsRoutes);
const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);
const organizationRoutes = require('./routes/organization');
app.use('/api/organizations', organizationRoutes);
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


// Auth routes
const authSupabaseRoutes = require('./routes/authSupabase');

// Login nu e protejat
app.use('/api/auth/login', authSupabaseRoutes);

// Protejează toate celelalte rute
app.use(authMiddleware);

const authMiddleware = require('./middleware/authMiddleware');

const requireRole = require('./middleware/roleMiddleware');

// Exemplu de rută protejată


// Exemplu: doar superadmin
app.get('/api/superadmin', requireRole(['superadmin']), (req, res) => {
  res.json({ message: 'Acces permis doar superadmin', user: req.user });
});

// Exemplu: doar owner
app.get('/api/owner', requireRole(['owner']), (req, res) => {
  res.json({ message: 'Acces permis doar owner', user: req.user });
});

// Exemplu: doar manager
app.get('/api/manager', requireRole(['manager']), (req, res) => {
  res.json({ message: 'Acces permis doar manager', user: req.user });
});

// Exemplu: doar medic
app.get('/api/medic', requireRole(['medic']), (req, res) => {
  res.json({ message: 'Acces permis doar medic', user: req.user });
});

// Exemplu: doar asistent
app.get('/api/asistent', requireRole(['asistent']), (req, res) => {
  res.json({ message: 'Acces permis doar asistent', user: req.user });
});

// Exemplu: orice rol autenticat
app.get('/api/protected', (req, res) => {
  res.json({ message: 'Acces permis oricărui utilizator autentificat', user: req.user });
});


app.get('/', (req, res) => {
  res.send('Backend API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
