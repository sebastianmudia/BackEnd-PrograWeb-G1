import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Evento = sequelize.define('evento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaTexto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lugar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Todas las carreras'
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Charla'
    },
    pasado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export default Evento;
