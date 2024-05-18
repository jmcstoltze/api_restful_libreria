var mongoose = require('mongoose')
var LibroSchema = require('../models/Schema')

var fs = require('fs')
var path = require('path')

// Crea registros de libros
function CreateLibro(req, res) {
    try {
        var params = req.body

        var libro = new LibroSchema({
            ISBN: params.ISBN,
            nombreLibro: params.nombreLibro,
            autor: params.autor,
            editorial: params.editorial,
            portada: params.portada,
            paginas: params.paginas,            
        })

        libro.save().then((data) =>{
            return res.json({
                status: 'success',
                message: 'Libro agregado con éxito!',
                data
            })
        })
        .catch((e) =>{
            return res.json({
                status: 'error',
                message:'Ha ocurrido un error al agregar el libro.',
                stacktrace: e
            })
        }) 

    } catch (e) {
        console.log('Error:', e); // Imprime error en consola para debugging
        return res.json({
            status: 'error',
            message:'Ha ocurrido un error.',
            stacktrace: e
        })
    }
}

// Obtiene libro por id
function GetLibroById(req, res) {
    var id = req.params.id

    LibroSchema.findById(id).then((data) =>{
        if(data === null){
            return res.json({
                status: 'error',
                message: 'Libro no encontrado',
                idLibro: id
            })
        }

        return res.json({
            status: 'success',
            message: 'Libro encontrado',
            libro: data
        })
    })
}

// Obtiene libros por filtro (autor, título y editorial)
function SearchLibrosByFilter(req, res) {
    var filtro = req.params.filter

    LibroSchema.find({ 
        "$or":[
            {"autor": {"$regex": filtro, "$options": "i"}},
            {"nombreLibro": {"$regex": filtro, "$options": "i"}},
            {"editorial": {"$regex": filtro, "$options": "i"}}
        ]
    })
    .sort([['autor', 'ascending']])
    .then((data) =>{
        if(data === null || data.length === 0){
            return res.json({
                status: 'error',
                message: 'No se encontraron registros con el filtro ' + filtro
            })
        }

        return res.json({
            status: 'success',
            message: 'Se encontraron registros',
            filtro: filtro,
            count: data.length,
            libros: data
        })
    })
    .catch((error) => {
        console.log('Error en la búsqueda:', error.message); // Imprime error para debugging
        return res.json({
            status: 'error',
            message: 'Error en la búsqueda',
            error: error.message
        });
    });
}

// Obtiene todos los registros
function GetLibros(req, res) {
    
    LibroSchema.find({ })
    .sort({ autor: 'asc' })    
    .then((data) => {
        if (data === null || data.length === 0) {
            return res.json({
                status: 'error',
                message: 'No se encontraron registros.'
            });
        }

        return res.json({
            status: 'success',
            message: 'Registros encontrados.',
            total: data.length,
            libros: data
        })
    })
    .catch((e) => {
        return res.json({
            status: 'error',
            message: 'Error al buscar registros',
            error: e.message
        })
    })
}

// Actualiza registro por id
function UpdateLibro(req, res) {
    var id = req.params.id
    var params = req.body

    LibroSchema.findByIdAndUpdate({ _id:id }, params, { new: true })
    .then((data) =>{
        if(data === null){
            return res.json({
                status: 'error',
                message: 'No se pudo actualizar el registro'
            })
        }

        return res.json({
            status: 'success',
            message: 'Registro actualizado con éxito!',
            libro: data
        })
    })
    .catch((e) =>{
        return res.json({
            status: 'error',
            message: 'Ha ocurrido un error en el servidor',
            stacktrace: e
        })
    })
}

// Elimina registro po id
function DeleteLibro(req, res) {
    var id = req.params.id

    if(id === null){
        return res.json({
            status: 'error',
            message: 'El id debe ser proporcionado'
        })
    }

    LibroSchema.findByIdAndDelete({ _id:id })
    .then((data) =>{
        if(data === null){
            return res.json({
                status: 'error',
                message: 'Registro no encontrado' 
            })
        }

        return res.json({
            status: 'success',
            message: 'Registro eliminado con éxito!',
            libro: data
        })
    })
    .catch((e) =>{
        return res.json({
            status: 'error',
            message: 'Ha ocurrido un error en el servidor',
            stacktrace: e
        })
    })
}

// Sube archivo indicando id del registro
function UploadFile(req, res) {
    const file = req.file
    var id = req.params.id

    if(!file){
        return res.status(404).send({
            status: 'error',
            message: 'File cannot be empty or file ext is not allowed'
        })
    }

    var tempFilename = file.filename

    if(id){
        LibroSchema.findOneAndUpdate({ _id:id }, { portada: tempFilename }, { new: true })
        .then((data) =>{
            if(data === null){
                return res.json({
                    status: 'error',
                    message: 'No se actualizó la imagen del paciente'
                })
            }

            return res.json({
                status: 'success',
                message: 'Imagen actualizada',
                libro: data
            })
        })
    }
}

// Obtiene archivo desde el registro
function GetFile(req, res) {
    var file = req.params.filename
    var pathFile = './uploads/' + file

    if(exists = fs.existsSync(pathFile)){
        return res.sendFile(path.resolve(pathFile))
    }else{
        return res.status(404).send({
            status: 'error',
            message: 'Image with image: '+ file + ' was not found'
        })
    }
}

module.exports = {
    CreateLibro,
    GetLibros,
    GetLibroById,    
    SearchLibrosByFilter,
    UpdateLibro,
    DeleteLibro,
    UploadFile,
    GetFile,
}
