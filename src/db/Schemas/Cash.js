const { Schema, model } = require('mongoose');

const CashSchema = Schema({
    codigo: { type: String, required: [true, 'El código es obligatorio'] },
    concepto: Number,
    cantidad: Number,
    valor_unitario: Number,
    importe_total: Number,
    fecha: Date,
    detalles: String,
    numero_recibo: { type: String, required: [true, 'Número de recibo obligatorio'] },
    tipo_pago: String
}, {
    timestamps: true
})

module.exports = model('cash', CashSchema)