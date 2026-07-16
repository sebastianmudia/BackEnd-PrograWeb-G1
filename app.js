import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import usuarioRouter from './src/routes/usuario.js';
import eventoRouter from './src/routes/evento.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ mensaje: 'API ULIMA Eventos', code: 200 });
});

app.use('/auth', usuarioRouter);
app.use('/eventos', eventoRouter);

export default app;
