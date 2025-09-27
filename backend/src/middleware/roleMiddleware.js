// Middleware pentru control pe roluri
function requireRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acces interzis: rol insuficient' });
    }
    next();
  };
}

module.exports = requireRole;
