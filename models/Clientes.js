import {Schema, model} from "mongoose";

const clienteSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    apellido: {
        type: String,
        trim: true,
        required: true
    },
    dni: {
        type: Number,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: Number,
        trim: true,
        required: true
    }
});

const Clientes = model('Clientes',clienteSchema,'Clientes');
export default Clientes;