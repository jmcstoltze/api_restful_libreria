var express = require('express')
var router = express.Router()
var controller = require('../controllers/LibroController')
var upload = require('../config/Multer')

// Ruta para crear registro de libro
router.post('/libro', controller.CreateLibro)

// Ruta para obtener libro por Id
router.get('/libro/:id', controller.GetLibroById)
// Ruta para obtener todos los pacientes
router.get('/libros', controller.GetLibros)

// Ruta para búsqueda personalizada (título, autor)
router.get('/libros/search/:filter', controller.SearchLibrosByFilter)

// Ruta para actualizar información de un registro
router.put('/libro/:id', controller.UpdateLibro)
// Ruta para borrar registro
router.delete('/libro/:id', controller.DeleteLibro)

// Ruta para subir imagen de un registro
router.post('/imagen/upload/:id', upload, controller.UploadFile)
// Ruta para leer archivo de un registro
router.get('/imagen/:filename', controller.GetFile)

module.exports = router
