import eventoService from '../services/evento.js';

const findAll = async (req, res) => {
    try {
        const { carrera, texto } = req.query;
        const eventos = await eventoService.listar({ carrera, texto });
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const findProximos = async (req, res) => {
    try {
        const eventos = await eventoService.listarProximos();
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const findHistorial = async (req, res) => {
    try {
        const eventos = await eventoService.listarHistorial();
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const findOne = async (req, res) => {
    try {
        const evento = await eventoService.obtener(req.params.id);
        if (!evento) {
            return res.status(404).json({ success: false, message: 'Evento no encontrado.' });
        }
        return res.status(200).json(evento);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const result = await eventoService.crear(req.body);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const result = await eventoService.editar(req.params.id, req.body);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const result = await eventoService.eliminar(req.params.id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const controller = { findAll, findProximos, findHistorial, findOne, create, update, remove };

export default controller;
