import { redis } from '../config/redis.js';

export async function cacheMiddleware(req, res, next) {
  const key = `cache:${req.baseUrl}${req.path}`;

  const cached = await redis.get(key);
  if (cached) {
    console.log('🟢 RESPUESTA DESDE REDIS:', key);
    return res.json(JSON.parse(cached));
  }

  const originalJson = res.json.bind(res);

  res.json = body => {
    redis.setex(key, 60, JSON.stringify(body));
    originalJson(body);
  };

  next();
}
