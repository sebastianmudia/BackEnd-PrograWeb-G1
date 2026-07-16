import express from 'express';
import controller from '../controllers/evento.js';
import authMiddleware, { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.get('/', controller.findAll);
router.get('/proximos', controller.findProximos);
router.get('/historial', controller.findHistorial);
router.get('/:id', controller.findOne);

// Rutas solo para administrador
router.post('/', authMiddleware, adminMiddleware, controller.create);
router.put('/:id', authMiddleware, adminMiddleware, controller.update);
router.delete('/:id', authMiddleware, adminMiddleware, controller.remove);

export default router;
