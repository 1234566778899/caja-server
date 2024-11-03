const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: String,
    cargo: String,
    dni: { type: String, required: [true, 'El dni es requerido'] },
    telefono: String,
    correo: String,
    nombre_contribuyente: String,
    rol: { type: String, enum: { values: ['admin', 'user'], message: '{VALUE} no es rol válido' }, required: [true, 'El rol es requerido'] }
}, {
    timestamps: true
})

module.exports = model('user', UserSchema)  