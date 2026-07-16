import usuarioService from '../services/usuario.js';

const registrar = async (req, res) => {
    try {
        const { nombre, correo, codigo, carrera, password } = req.body;
        const response = await usuarioService.registrar({ nombre, correo, codigo, carrera, password });
        return res.status(response.success ? 201 : 400).json(response);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { identificador, password } = req.body;
        const result = await usuarioService.login({ identificador, password });
        return res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.obtenerUsuario(req.params.id);
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const editarUsuario = async (req, res) => {
    try {
        const idSolicitado = parseInt(req.params.id);
        if (req.usuario.rol !== 'admin' && req.usuario.id !== idSolicitado) {
            return res.status(403).json({ success: false, message: 'No puedes editar el perfil de otro usuario.' });
        }
        const result = await usuarioService.editarUsuario(idSolicitado, req.body);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error inesperado', error: error.message });
    }
};

const controller = { registrar, login, listarUsuarios, obtenerUsuario, editarUsuario };

export default controller;
