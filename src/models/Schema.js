var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Definición del esquema del libro
var libroSchema = Schema({
    ISBN: { type: String, required: true },
    nombreLibro: { type: String, required: true },
    autor: { type: String, required: true },
    editorial: { type: String, required: true },
    portada: { type: String },
    paginas: { type: Number, required:true },
})

// Exporta el modelo del esquema paciente
module.exports = mongoose.model('LibroSchema', libroSchema)
