const express = require ('express')
const {Router} = express
const handlebars = require('express-handlebars')
const upload = require('./multer.js')

const router = new Router()

const Contenedor = require('./claseContenedor.js')

const app = express()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on ("error", error => console.log(`Error de conexión: ${error}`))

const productos = new Contenedor ('./productosNuevo.json')

app.use('/api', router)
app.use(express.static('public'))

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// Configuración de Handlebars
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/public/views/layouts',
    partialsDir: __dirname + '/public/views/partials'
}))

app.set ("view engine", "hbs")
app.set ("views", "./public/views")

// GET '/api/productos'
router.get('/productos', async (req, res) => {
    const respuesta =  await productos.getAll()
    res.render('main', {respuesta})
})

// GET producto by id por parámetro
router.get('/productos/:id', async (req, res) => {
    const respuesta = await productos.getById(parseInt(req.params.id))
    res.send(!respuesta ? {error: "producto no encontrado"} : respuesta)
    })

// POST. Agrega un producto y devuelve su id
router.post('/productos', upload.single('picture'), async (req, res) => {
    const prod = await req.body
    console.log("prod: ", prod)
    const file = req.file
    const nombreArchivo = req.file.filename
    const producto = {
        ...prod,
        thumbnail: nombreArchivo
    }
    if (!file) {
        const error = new Error ('Por favor, suba un archivo')
        error.httpStatusCode = 400
        return next (error)
    }
    productos.save(producto)
    .then( respuesta => {
    res.render('formulario', {respuesta, registrado: true})
    })
})

// PUT. Recibe y actualiza un producto según id
router.put('/productos/:id', (req, res) => {
    const cambio = req.body
    console.log("cambio: ", cambio)
    const pos = parseInt(req.params.id)
    productos.modifyById(pos, cambio)
})

// DELETE. Elimina según id
router.delete('/productos/:id', (req, res) => {
    const pos = parseInt(req.params.id)
    productos.deleteById(pos)
    res.send({"Producto eliminado. ID": pos})
})

// Renderiza el index.html
app.get('/', (req, res, next) => {
    res.render('formulario', {home: true})
})

