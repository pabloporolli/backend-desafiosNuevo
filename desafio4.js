const express = require ('express')
const {Router} = express

const router = new Router()

const Contenedor = require('./desafio2.js')

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

// GET '/api/productos'
router.get('/productos', async (req, res) => {
    const respuesta =  await productos.getAll()
    res.send({Productos: respuesta})
})

// GET producto by id por parámetro
router.get('/productos/:id', async (req, res) => {
    const respuesta = await productos.getById(parseInt(req.params.id))
    res.send(!respuesta ? {error: "producto no encontrado"} : respuesta)
    })

// POST. Agrega un producto y devuelve su id
router.post('/productos', async (req, res) => {
    const prod = await req.body
    console.log("prod: ", prod)
    productos.save(prod)
    .then( respuesta => {
    res.send({idAsignado: respuesta})
    })
})

// Producto a agregar
/* {
    "title": "Scott",
    "Price": 5500,
    "thumbnail": "https://img.velocorner.ch/204732/conversions/353_Orbea_Ordu_M20iLTD_custom_XL-medium.jpg"

} */

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
    res.sendFile(__dirname + '/public/index.html')
})