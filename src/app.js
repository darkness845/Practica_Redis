import express from 'express';

import equiposRoutes from './routes/equipos.routes.js';
import jugadoresRoutes from './routes/jugadores.routes.js';

const app = express();

app.use(express.json());

app.use('/api/equipos', equiposRoutes);
app.use('/api/jugadores', jugadoresRoutes);

app.get('/', (req, res) => {
  res.send('<h1>API funcionando</h1>');
});

export default app;
