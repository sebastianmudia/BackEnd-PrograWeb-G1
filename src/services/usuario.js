import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import repository from '../repositories/usuario.js';
import { JWT_SECRET } from '../middleware/auth.js';

const generarToken = (id, nombre, correo, rol) => {
    return jwt.sign({ id, nombre, correo, rol }, JWT_SECRET, { expiresIn: '7d' });
};

const sanitize = (usuario) => {
    const plain = usuario.get ? usuario.get({ plain: true }) : usuario;
    const { password, ...rest } = plain;
    return rest;
};

const registrar = async ({ nombre, correo, codigo, carrera, password }) => {
    if (!nombre || !correo || !codigo || !carrera || !password) {
        return { success: false, message: 'Proporcione nombre, correo, codigo, carrera y password.' };
    }

    if (await repository.findByCorreo(correo)) {
        return { success: false, message: 'Ya existe un usuario con ese correo.' };
    }

    if (await repository.findByCodigo(codigo)) {
        return { success: false, message: 'Ya existe un usuario con ese codigo.' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await repository.create({
        nombre,
        correo,
        codigo,
        carrera,
        password: hashedPassword,
        rol: 'usuario'
    });

    if (!nuevoUsuario) {
        return { success: false, message: 'No se pudo crear el usuario.' };
    }

    const token = generarToken(nuevoUsuario.id, nuevoUsuario.nombre, nuevoUsuario.correo, nuevoUsuario.rol);

    return {
        success: true,
        message: 'Usuario creado exitosamente',
        token,
        usuario: sanitize(nuevoUsuario)
    };
};

const login = async ({ identificador, password }) => {
    if (!identificador || !password) {
        return { success: false, message: 'Usuario o password incorrectos.' };
    }

    const usr = await repository.findByCredencial(identificador);
    if (!usr) {
        return { success: false, message: 'Usuario o password incorrectos.' };
    }

    const isPasswordValid = await bcrypt.compare(password, usr.password);
    if (!isPasswordValid) {
        return { success: false, message: 'Usuario o password incorrectos.' };
    }

    const token = generarToken(usr.id, usr.nombre, usr.correo, usr.rol);

    return {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        usuario: sanitize(usr)
    };
};

const listarUsuarios = async () => {
    const usuarios = await repository.findAll();
    return (usuarios ?? []).map(sanitize);
};

const obtenerUsuario = async (id) => {
    const usuario = await repository.findOne(id);
    if (!usuario) return null;
    return sanitize(usuario);
};

const editarUsuario = async (id, { nombre, carrera, password }) => {
    const cambios = {};
    if (nombre) cambios.nombre = nombre;
    if (carrera) cambios.carrera = carrera;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        cambios.password = await bcrypt.hash(password, salt);
    }

    const resultado = await repository.update(cambios, id);
    if (!resultado) {
        return { success: false, message: 'No se pudo actualizar el usuario.' };
    }

    const actualizado = await repository.findOne(id);
    return { success: true, message: 'Perfil actualizado', usuario: sanitize(actualizado) };
};

const usuarioService = { registrar, login, listarUsuarios, obtenerUsuario, editarUsuario };

export default usuarioService;
