const express = require ('express')
const {Router} = express
const upload = require('./multerPug.js')

const router = new Router()

const Contenedor = require('./claseContenedorPug')

const app = express()

const PORT = 8090
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on ("error", error => console.log(`Error de conexión: ${error}`))

const productos = new Contenedor ('./productosPug.json')

app.use('/api', router)

router.use(express.json())
router.use(express.urlencoded({extended: true}))

app.use('/uploads', express.static('uploads'))

app.set ("view engine", "pug")
app.set ("views", "./views")

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


app.get('/', (req, res, next) => {
    res.render('formulario')
})

