import sequelize from '../config/database.js';
import model from '../models/usuario.js';
import RepositoryBase from './RepositoryBase.js';

class UsuarioRepository extends RepositoryBase {
    async findByCorreo(correo) {
        try {
            return await this.model.findOne({
                where: sequelize.where(
                    sequelize.fn('lower', sequelize.col('correo')),
                    correo?.toLowerCase()
                )
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findByCodigo(codigo) {
        try {
            return await this.model.findOne({
                where: { codigo: codigo }
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Busca por correo o por codigo (para el login)
    async findByCredencial(identificador) {
        try {
            const porCorreo = await this.findByCorreo(identificador);
            if (porCorreo) return porCorreo;
            return await this.findByCodigo(identificador);
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

const repository = new UsuarioRepository(model);

export default repository;
