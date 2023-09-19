import {Schema, model, Types} from "mongoose";

const automovilesSchema = new Schema({
    marca: {
        type: String,
        trim: true,
        required: true
    },
    modelo: {
        type: String,
        trim: true,
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    placa: {
        type: Number,
        required: true,
        unique: true 
    },
    precio: {
        type: Number,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['disponible', 'no disponible'], 
        required: true
    },
    sucursal: {
        type: Types.ObjectId,
        ref: 'Sucursales',  
        required: true
    }
});

const Autos = model('automoviles',automovilesSchema,'automoviles');
export default Autos;