import sequelize from '../config/database.js';
import Usuario from '../models/usuario.js';
import Evento from '../models/evento.js';

// Passwords cifrados con bcrypt (admin123 / andrea123 / carlos123 / lucia123 / diego123 / valeria123)
const usuarios = [
    { id: 1, nombre: 'Administrador ULIMA',  correo: 'admin@ulima.edu.pe',                codigo: 'ADMIN001', carrera: 'Administración',         password: '$2b$10$XUD0W0gRqp5L5ZCfuhMSaed.CtbuiWd4xLVVz9ss.GyrQ6qKTv3QC', rol: 'admin'   },
    { id: 2, nombre: 'Andrea Quispe Torres', correo: 'andrea.quispe@aloe.ulima.edu.pe',   codigo: '20210345', carrera: 'Ingeniería de Sistemas', password: '$2b$10$3GTYsYX258R453VJjeAnauTJkxrG4pe9ShqbHjZ6AF4/Tx0zSeyje', rol: 'usuario' },
    { id: 3, nombre: 'Carlos Mendoza Ríos',  correo: 'carlos.mendoza@aloe.ulima.edu.pe',  codigo: '20200789', carrera: 'Economía',               password: '$2b$10$1Xz3mAmfC/MyN8bDrLeYY.u1CBhlm7A7ZvETHamzbHZY2xcIQ7IHO', rol: 'usuario' },
    { id: 4, nombre: 'Lucía Fernández Vega', correo: 'lucia.fernandez@aloe.ulima.edu.pe', codigo: '20220112', carrera: 'Comunicaciones',         password: '$2b$10$y/PHybpr6JIbLy.QVrleneeJxUOHEdDfEUcKQB1W287VbCWPuzXHe', rol: 'usuario' },
    { id: 5, nombre: 'Diego Huamán Paredes', correo: 'diego.huaman@aloe.ulima.edu.pe',    codigo: '20190456', carrera: 'Derecho',                password: '$2b$10$0WMor253tRQBor9I.aflmeFgjeoX/5Orav.6PfLQDhaCaAUbQ5GKK', rol: 'usuario' },
    { id: 6, nombre: 'Valeria Soto Cáceres', correo: 'valeria.soto@aloe.ulima.edu.pe',    codigo: '20210678', carrera: 'Administración',         password: '$2b$10$llX15.N9Rrk2CJf0jet.beDYOgIiFJduOP6UnYThp2KtlKlvvjlbW', rol: 'usuario' }
];

const eventos = [
    { id: 1,  titulo: 'Hackathon Ulima 2026: Soluciones con IA',        descripcion: 'Participa en el hackathon anual donde equipos de estudiantes desarrollarán soluciones tecnológicas aplicando IA a problemas reales del sector público y privado peruano.', fecha: '2026-06-20', fechaTexto: 'Sábado 20 de junio de 2026 | De 08.00 a 20.00 horas',  lugar: 'Universidad de Lima, Laboratorios de Cómputo C3', carrera: 'Ingeniería de Sistemas', imagen: 'https://picsum.photos/seed/hack2026/600/340',    tipo: 'Competencia',   pasado: false },
    { id: 2,  titulo: 'Charla: Ciberseguridad en la Era del Cloud',     descripcion: 'El ingeniero Marco Delgado expondrá sobre los principales vectores de ataque en entornos de nube y las mejores prácticas de defensa para sistemas distribuidos.',              fecha: '2026-07-03', fechaTexto: 'Jueves 3 de julio de 2026 | De 17.00 a 19.00 horas',    lugar: 'Universidad de Lima, Auditorio C1',                carrera: 'Ingeniería de Sistemas', imagen: 'https://picsum.photos/seed/cyber2026/600/340',   tipo: 'Charla',        pasado: false },
    { id: 3,  titulo: 'Foro Económico Ulima: Perspectivas 2026',        descripcion: 'Economistas y representantes del BCR debatirán el panorama macroeconómico nacional e internacional, con foco en el nuevo periodo presidencial.',                             fecha: '2026-07-10', fechaTexto: 'Jueves 10 de julio de 2026 | De 10.00 a 13.00 horas',   lugar: 'Universidad de Lima, Auditorio I2',                carrera: 'Economía',               imagen: 'https://picsum.photos/seed/foro2026/600/340',    tipo: 'Foro',          pasado: false },
    { id: 4,  titulo: 'Taller de Producción Audiovisual con IA',        descripcion: 'Taller práctico donde los estudiantes explorarán herramientas de IA generativa aplicadas a la producción de contenido audiovisual.',                                        fecha: '2026-07-18', fechaTexto: 'Viernes 18 de julio de 2026 | De 14.00 a 17.00 horas',  lugar: 'Universidad de Lima, Estudio de Televisión',       carrera: 'Comunicaciones',         imagen: 'https://picsum.photos/seed/media2026/600/340',   tipo: 'Taller',        pasado: false },
    { id: 5,  titulo: 'Conversatorio: Reforma del Sistema Judicial',    descripcion: 'Panel de magistrados y docentes analizará las propuestas de reforma al sistema de justicia peruano.',                                                                          fecha: '2026-07-25', fechaTexto: 'Viernes 25 de julio de 2026 | De 16.00 a 18.00 horas',  lugar: 'Universidad de Lima, Sala de Grados F2',           carrera: 'Derecho',                imagen: 'https://picsum.photos/seed/derecho2026/600/340', tipo: 'Conversatorio', pasado: false },
    { id: 6,  titulo: 'Open Ulima: Feria y Charlas de Carreras',        descripcion: 'Conoce el campus, participa en la feria y asiste a charlas. Aforo limitado.',                                                                                                      fecha: '2026-08-02', fechaTexto: 'Sábado 2 de agosto de 2026 | Desde las 08.00 horas',    lugar: 'Universidad de Lima, Campus Principal',            carrera: 'Todas las carreras',     imagen: 'https://picsum.photos/seed/open2026/600/340',    tipo: 'Feria',         pasado: false },
    { id: 7,  titulo: 'Exposición: Proyectos de Software Fin de Ciclo', descripcion: 'Los estudiantes del décimo ciclo presentaron sus proyectos finales ante un jurado de docentes y representantes de empresas tecnológicas.',                                   fecha: '2026-05-30', fechaTexto: 'Viernes 30 de mayo de 2026 | De 09.00 a 13.00 horas',   lugar: 'Universidad de Lima, Laboratorios de Cómputo C2',  carrera: 'Ingeniería de Sistemas', imagen: 'https://picsum.photos/seed/expo2026/600/340',    tipo: 'Exposición',    pasado: true  },
    { id: 8,  titulo: 'Presentación de Libro: Perú, El Desarrollo Esquivo', descripcion: 'Reflexión sobre las oportunidades y desafíos de la economía peruana. Expositor: Elmer Cuba.',                                                                              fecha: '2026-06-11', fechaTexto: 'Jueves 11 de junio de 2026 | De 17.00 a 19.00 horas',   lugar: 'Universidad de Lima, Auditorio I2',                carrera: 'Economía',               imagen: 'https://picsum.photos/seed/libro2026/600/340',   tipo: 'Presentación',  pasado: true  },
    { id: 9,  titulo: 'Feria Impacto Verde: Día del Medio Ambiente',    descripcion: 'El Centro de Sostenibilidad conmemoró el Día Mundial del Medio Ambiente con actividades sobre hábitos responsables.',                                                         fecha: '2026-06-05', fechaTexto: 'Viernes 5 de junio de 2026 | De 10.00 a 13.00 horas',   lugar: 'Universidad de Lima, Hall del Edificio F1',        carrera: 'Todas las carreras',     imagen: 'https://picsum.photos/seed/verde2026/600/340',   tipo: 'Feria',         pasado: true  },
    { id: 10, titulo: 'Simulacro Empresarial: Gestión de Crisis',       descripcion: 'Estudiantes de Administración tomaron decisiones estratégicas bajo presión con retroalimentación de ejecutivos de empresas líderes del país.',                               fecha: '2026-05-22', fechaTexto: 'Jueves 22 de mayo de 2026 | De 14.00 a 17.00 horas',    lugar: 'Universidad de Lima, Aula Magna',                  carrera: 'Administración',         imagen: 'https://picsum.photos/seed/admin2026/600/340',   tipo: 'Simulacro',     pasado: true  }
];

async function migrate() {
    try {
        // Recrea las tablas según los modelos y carga la data semilla
        await sequelize.sync({ force: true });
        await Usuario.bulkCreate(usuarios);
        await Evento.bulkCreate(eventos);

        // Sincroniza las secuencias de los ids tras insertar ids explícitos
        for (const tabla of ['usuarios', 'eventos']) {
            await sequelize.query(
                `SELECT setval(pg_get_serial_sequence('${tabla}', 'id'), (SELECT MAX(id) FROM ${tabla}))`
            );
        }

        console.log(`Migración completada: ${usuarios.length} usuarios y ${eventos.length} eventos insertados.`);
    } catch (error) {
        console.error('Error en la migración:', error);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

migrate();
