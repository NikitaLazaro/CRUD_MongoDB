const Alumno = require('../model/Alumno');

// Mostrar
module.exports.mostrar = (req, res) => {
    Alumno.find({})
        .then(alumnos => {
            res.render('../views/index', { alumnos: alumnos });
        })
        .catch(error => {
            console.error('Error mostrando los alumnos:', error);
            res.status(500).json({ message: 'Error mostrando los alumnos' });
        });
};

// Crear un alumno
module.exports.crear = async (req, res) => {
    try {
        const alumno = new Alumno({
            nombre: req.body.nombre,
            edad: req.body.edad
        });

        // Guardar el alumno en la base de datos
        await alumno.save();

        // Redireccionar después de crear el alumno
        res.redirect('/');
    } catch (error) {
        // Manejar errores
        console.error('Error al crear el Alumno:', error);
        return res.status(500).json({ message: 'Error al crear el Alumno' });
    }
};

// Editar
module.exports.editar = async (req, res) => {
    try {
        const id = req.body.id_editar;
        const nombre = req.body.nombre_editar;
        const edad = req.body.edad_editar;

        // Actualizar el alumno en la base de datos
        await Alumno.findByIdAndUpdate(id, { nombre, edad });

        // Redireccionar después de editar el alumno
        res.redirect('/');
    } catch (error) {
        // Manejar errores
        console.error('Error actualizando el Alumno:', error);
        return res.status(500).json({ message: 'Error actualizando el Alumno' });
    }
};

// Borrar
module.exports.borrar = async (req, res) => {
    try {
        const id = req.params.id;

        // Buscar el alumno por su ID y eliminarlo de la base de datos
        const alumnoEliminado = await Alumno.findByIdAndDelete(id);

        if (!alumnoEliminado) {
            // Si no se encuentra el alumno, devolver un mensaje de error
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        // Redireccionar después de borrar el alumno
        res.redirect('/');
    } catch (error) {
        // Manejar errores
        console.error('Error eliminando el Alumno:', error);
        return res.status(500).json({ message: 'Error eliminando el Alumno' });
    }
};
