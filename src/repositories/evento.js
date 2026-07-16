import { Op } from 'sequelize';
import model from '../models/evento.js';
import RepositoryBase from './RepositoryBase.js';

class EventoRepository extends RepositoryBase {
    async findProximos() {
        try {
            return await this.model.findAll({
                where: { pasado: false },
                order: [['fecha', 'ASC']]
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findHistorial() {
        try {
            return await this.model.findAll({
                where: { pasado: true },
                order: [['fecha', 'DESC']]
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findByCarrera(carrera) {
        try {
            return await this.model.findAll({
                where: { carrera: carrera },
                order: [['fecha', 'ASC']]
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findByTexto(texto) {
        try {
            return await this.model.findAll({
                where: {
                    [Op.or]: [
                        { titulo: { [Op.iLike]: `%${texto}%` } },
                        { descripcion: { [Op.iLike]: `%${texto}%` } }
                    ]
                },
                order: [['fecha', 'ASC']]
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

const repository = new EventoRepository(model);

export default repository;
