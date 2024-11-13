const { Schema, model } = require('mongoose');

const CashSchema = Schema({
    codigo: { type: String, required: [true, 'El código es obligatorio'] },
    concepto: String,
    cantidad: Number,
    valor_unitario: Number,
    importe_total: Number,
    fecha: Date,
    detalles: String,
    tipo_pago: String,
    uid: String,
    nombre: String,
    dni: { type: String, required: [true, 'El dni es requerido'] },
    domicilio: String,
    telefono: String
}, {
    timestamps: true
})

module.exports = model('cash', CashSchema)