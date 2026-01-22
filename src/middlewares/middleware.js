export function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers['api-key'];

  if (apiKey === 'ADMIN_KEY') {
    req.apiUser = { role: 'admin' };
    return next();
  }

  if (apiKey === 'USER_KEY') {
    req.apiUser = { role: 'user' };
    return next();
  }

  return res.status(401).json({ error: 'API Key inválida' });
}

export function adminMiddleware(req, res, next) {
  if (req.apiUser?.role !== 'admin') {
    return res.status(403).json({
      error: 'Solo administradores'
    });
  }

  next();
}
