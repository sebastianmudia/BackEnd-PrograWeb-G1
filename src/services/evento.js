import eventoRepo from '../repositories/evento.js';

// Calcula si un evento ya pasó comparando su fecha con hoy
const calcularPasado = (fechaISO) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return new Date(fechaISO + 'T00:00:00') < hoy;
};

const formatearFecha = (fechaISO) => {
    const [a, m, d] = fechaISO.split('-');
    return `${d}/${m}/${a}`;
};

const listar = async ({ carrera, texto } = {}) => {
    if (texto) return await eventoRepo.findByTexto(texto);
    if (carrera && carrera !== 'Todas las carreras') return await eventoRepo.findByCarrera(carrera);
    return await eventoRepo.findAll();
};

const listarProximos = async () => await eventoRepo.findProximos();

const listarHistorial = async () => await eventoRepo.findHistorial();

const obtener = async (id) => await eventoRepo.findOne(id);

const crear = async (datos) => {
    const { titulo, descripcion, fecha, lugar, carrera, imagen, tipo, fechaTexto } = datos;

    if (!titulo || !descripcion || !fecha || !lugar) {
        return { success: false, message: 'Titulo, descripcion, fecha y lugar son obligatorios.' };
    }

    const nuevo = await eventoRepo.create({
        titulo,
        descripcion,
        fecha,
        lugar,
        carrera: carrera || 'Todas las carreras',
        imagen: imagen || `https://picsum.photos/seed/ev${Date.now()}/600/340`,
        tipo: tipo || 'Charla',
        fechaTexto: fechaTexto || formatearFecha(fecha),
        pasado: calcularPasado(fecha)
    });

    if (!nuevo) {
        return { success: false, message: 'No se pudo crear el evento.' };
    }

    return { success: true, message: 'Evento creado exitosamente', evento: nuevo };
};

const editar = async (id, datos) => {
    const cambios = { ...datos };
    if (cambios.fecha) {
        cambios.pasado = calcularPasado(cambios.fecha);
        cambios.fechaTexto = cambios.fechaTexto || formatearFecha(cambios.fecha);
    }

    const resultado = await eventoRepo.update(cambios, id);
    if (!resultado) {
        return { success: false, message: 'Evento no encontrado.' };
    }

    const actualizado = await eventoRepo.findOne(id);
    return { success: true, message: 'Evento actualizado', evento: actualizado };
};

const eliminar = async (id) => {
    const eliminados = await eventoRepo.remove(id);
    if (!eliminados) {
        return { success: false, message: 'Evento no encontrado.' };
    }
    return { success: true, message: 'Evento eliminado.' };
};

const eventoService = { listar, listarProximos, listarHistorial, obtener, crear, editar, eliminar };

export default eventoService;
