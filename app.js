const express = require('express')
const app = express()

const db = require('./db')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


const alumnos = require('./routes/alumnos')
app.use(alumnos)
//Ruta de prueba
//Cuando apuntamos a la ruta raíz nos muestra un holaMundo
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, ()=>{
    console.log("Server is running")
})