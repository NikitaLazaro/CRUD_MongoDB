const mongoose = require('mongoose')
const url = 'mongodb://localhost/db_alumnos'

mongoose.connect(url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console,'Error de conexión a la base de datos'))
db.once('open', function callback() {
    console.log('Conectado a la base de datos')
})

module.exports = db
//for form data to be sent in req.body