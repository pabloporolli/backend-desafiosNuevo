const express = require ('express')

const Contenedor = require('./desafio2.js')

const app = express()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

const productos = new Contenedor ('./productosNuevo.json');

app.get('/productos', (req, res) => {
    productos.getAll()
    .then((respuesta) => {
        res.send(respuesta)
    })
    .catch ((error) => console.log(error))
})

app.get('/productoRandom', (req, res) => {
    productos.getAll()
    .then((contenido) =>{
        let cantIds = contenido.length
        console.log("CONTENIDO: ", cantIds);
        let idAleatorio = Math.round(Math.random() * cantIds)
        console.log("Aleatorio: ", idAleatorio)
        productos.getById(idAleatorio)
        .then((respuesta) => {
            res.send(respuesta)
    })})
    .catch ((error) => console.log(error))
})

server.on ("error", error => console.log(`Error de conexión: ${error}`))