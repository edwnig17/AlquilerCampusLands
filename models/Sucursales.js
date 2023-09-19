import {Schema, model, Types} from "mongoose";

const sucursalesSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    },
    ciudad: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: Number,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    gerente: {
        type: String,
        trim: true,
        required: true
    }
});

const Sucursales = model('sucursales',sucursalesSchema,'sucursales');
export default Sucursales;