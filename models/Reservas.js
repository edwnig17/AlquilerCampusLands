import {Schema, model, Types} from "mongoose";

const reservasSchema = new Schema({
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',  // Referenciando a la colección Clientes
        required: true
    },
    auto: {
        type: Schema.Types.ObjectId,
        ref: 'Autos',  
        required: true
    },
    fecha_inicio_reserva: {
        type: Date,
        required: true
    },
    fecha_fin_reserva: {
        type: Date,
        required: true
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursales', 
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'], 
        required: true
    }
});

const Reservas = model('reservas', reservasSchema,'reservas');
export default Reservas;