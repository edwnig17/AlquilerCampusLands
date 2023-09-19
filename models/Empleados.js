import {Schema, model, Types} from "mongoose";

const empleadoSchema = Schema({
    nombre:{
        type:String,
        trim:true,
        required:[true]
    },
    apellido:{
        type:String,
        trim:true,
        required:[true]
    },
    dni:{
        type:Number,
        trim:true,
        default:true
    },
    email:{
        type:String,
        trim:true,
        required:[true]
    },
    telefono:{
        type:Number,
        trim:true,
        required:[true]
    },
    cargo:{
        type:String,
        trim:true,
        required:[true]
    },
    sucursal:{
        type: Types.ObjectId,
        ref: "Sucursales",
        required:[true]
    },
    fecha_contratacion:{
        type:Date,
        required:[true]
    },
    salario:{
        type:Number,
        trim:true,
        default:true
    }
});

const Empleados = model('empleados',empleadoSchema,'empleados');
export default Empleados;