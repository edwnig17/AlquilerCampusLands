import {Schema, model, Types} from "mongoose";

const alquilerSchema = new Schema({
    cliente: {
        type: Types.ObjectId,
        ref: 'Clientes', 
        required: true
    },
    auto: {
        type: Types.ObjectId,
        ref: 'Autos', 
        required: true
    },
    fecha_inicio_alquiler: {
        type: Date,
        required: true
    },
    fecha_fin_alquiler: {
        type: Date,
        required: true
    },
    sucursal: {
        type: Types.ObjectId,
        ref: 'Sucursales', 
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

const Alquileres = model('alquileres',alquilerSchema,'alquileres');

export default Alquileres;