import express from 'express';

import equiposRoutes from './routes/equipos.routes.js';
import jugadoresRoutes from './routes/jugadores.routes.js';
import torneosRoutes from './routes/torneos.routes.js';
import partidasRoutes from './routes/partidas.routes.js';

const app = express();

app.use(express.json());

app.use('/api/equipos', equiposRoutes);
app.use('/api/jugadores', jugadoresRoutes);
app.use('/api/torneos', torneosRoutes);
app.use('/api/partidas', partidasRoutes);

app.get('/', (req, res) => {
  res.send('<h1>API funcionando</h1>');
});

export default app;
