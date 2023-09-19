import { MongoClient, ObjectId } from 'mongodb';

const url = "mongodb+srv://edwingstiven2023:1234@clusteralquilercarros.u8pfibm.mongodb.net/alquiler_carros";
const cliente = new MongoClient(url);

async function conectar() {
    try {
        await cliente.connect();
        console.log("Conexión a MongoDB establecida correctamente");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

conectar();

const db = cliente.db("alquiler_carros");

const obtenerClientes = async (req, res) => {
    try {
        const coleccion = db.collection("clientes");
        const respuesta = await coleccion.find().toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerAutomovilesDisponibles = async (req, res) => {
    try {
        const coleccion = db.collection("automoviles");
        const respuesta = await coleccion.find({ "estado": "disponible" }).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerClientesAlquilando = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $match: {
                    "estado": "activo"
                }
            },
            {
                $project: {
                    "cliente": 1,
                    "estado": 1
                }
            }
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerReservasPendientes = async (req, res) => {
    try {
        const coleccion = db.collection("reservas");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente_id",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $lookup: {
                    from: "automoviles",
                    localField: "car",
                    foreignField: "_id",
                    as: "auto"
                }
            },
            {
                $match: {
                    "estado": "pendiente"
                }
            },
            {
                $project: {
                    "cliente": 1,
                    "estado": 1,
                    "auto": 1
                }
            }
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerAlquilerPorId = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $lookup: {
                    from: "automoviles",
                    localField: "car",
                    foreignField: "_id",
                    as: "auto"
                }
            },
            {
                $lookup: {
                    from: "sucursales",
                    localField: "sucursal",
                    foreignField: "_id",
                    as: "sucursal"
                }
            },
            {
                $match: {
                    "_id": new ObjectId("65072d74de2beed4af0d1c5d")
                }
            },
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerEmpleadosPorRol = async (req, res) => {
    try {
        const coleccion = db.collection("empleados");
        const respuesta = await coleccion.find({ "rol": "Vendedor" }).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerCantidadAutomovilesPorSucursal = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "sucursales",
                    localField: "sucursal",
                    foreignField: "_id",
                    as: "sucursal"
                }
            },
            {
                $unwind: "$sucursal"
            },
            {
                $group: {
                    _id: "$sucursal.nombre",
                    totalAutomoviles: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    totalAutomoviles: 1
                },
            },
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerCostoAlquiler = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const proyeccion = { proyeccion: { "costo": 1 } };
        const respuesta = await coleccion.find({ "_id": new ObjectId("65072d74de2beed4af0d1c5d") }, proyeccion).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerClienteEspecifico = async (req, res) => {
    try {
        const coleccion = db.collection("clientes");
        const respuesta = await coleccion.find({ "dni": 12345678 }).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerAutomovilesConCapacidadMayorA5 = async (req, res) => {
    try {
        const coleccion = db.collection("automoviles");
        const respuesta = await coleccion.find({ "capacidad": { $gt: 5 } }).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerAlquileresPorFechaDeInicio = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $lookup: {
                    from: "automoviles",
                    localField: "car",
                    foreignField: "_id",
                    as: "auto"
                }
            },
            {
                $lookup: {
                    from: "sucursales",
                    localField: "sucursal",
                    foreignField: "_id",
                    as: "sucursal"
                }
            },
            {
                $match: {
                    "fecha_inicio": new Date("2023-07-05")
                }
            }
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerReservasPendientesPorCliente = async (req, res) => {
    try {
        const coleccion = db.collection("reservas");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente_id",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $lookup: {
                    from: "automoviles",
                    localField: "car",
                    foreignField: "_id",
                    as: "auto"
                }
            },
            {
                $match: {
                    "estado": "pendiente",
                    "cliente_id": new ObjectId("6506fadbde2beed4af0d1c34")
                }
            }
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerEmpleadosEspecificos = async (req, res) => {
    try {
        const coleccion = db.collection("empleados");
        const respuesta = await coleccion.find({ "rol": { $in: ["Gerente", "Asistente"] } }).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerClientesConAlMenosUnAlquiler = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "info_cliente"
                }
            },
            {
                $unwind: "$info_cliente"
            },
            {
                $group: {
                    _id: "$info_cliente._id",
                    nombre: { $first: "$info_cliente.nombre" },
                    numAlquileres: { $sum: 1 }
                }
            },
            {
                $match: {
                    numAlquileres: { $gte: 1 }
                }
            }
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerAutomovilesOrdenados = async (req, res) => {
    try {
        const coleccion = db.collection("automoviles");
        const respuesta = await coleccion.find().sort({ "marca": 1, "modelo": 1 }).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerCantidadAutomovilesPorUbicacion = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "sucursales",
                    localField: "sucursal",
                    foreignField: "_id",
                    as: "sucursal"
                }
            },
            {
                $unwind: "$sucursal"
            },
            {
                $group: {
                    _id: "$sucursal.direccion",
                    totalAutomoviles: {
                        $sum: 1
                    },
                    ubicacion: { $first: "$sucursal.ubicacion" }
                }
            },
            {
                $project: {
                    totalAutomoviles: 1,
                    ubicacion: 1
                },
            },
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerTotalAlquileres = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $group: {
                    _id: null,
                    totalAlquileres: {
                        $sum: 1
                    },
                }
            },
            {
                $project: {
                    totalAlquileres: 1
                },
            },
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerAutomovilesConCapacidadMayorA5Disponibles = async (req, res) => {
    try {
        const coleccion = db.collection("automoviles");
        const respuesta = await coleccion.find({ "capacidad": { $gte: 5 }, "estado": "disponible" }).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerAlquileresPorRangoDeFechas = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $lookup: {
                    from: "automoviles",
                    localField: "car",
                    foreignField: "_id",
                    as: "auto"
                }
            },
            {
                $lookup: {
                    from: "sucursales",
                    localField: "sucursal",
                    foreignField: "_id",
                    as: "sucursal"
                }
            },
            {
                $match: {
                    "fecha_inicio": {
                        $gte: new Date("2023-07-05"),
                        $lte: new Date("2023-07-10")
                    }
                }
            }
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerCantidadAlquileresActivos = async (req, res) => {
    try {
        const coleccion = db.collection("alquileres");
        const respuesta = await coleccion.countDocuments({ "estado": "activo" });
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const obtenerSucursalesConCantidadDeAutomoviles = async (req, res) => {
    try {
        const coleccion = db.collection("automoviles");
        const respuesta = await coleccion.aggregate([
            {
                $group: {
                    _id: "$sucursal",
                    totalAutomoviles: {
                        $sum: 1
                    }
                }
            },
            {
                $lookup: {
                    from: "sucursales",
                    localField: "_id",
                    foreignField: "_id",
                    as: "sucursal"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "nombre": "$sucursal.nombre",
                    "ubicacion": "$sucursal.ubicacion",
                    "totalAutomoviles": 1
                }
            }
        ]).toArray();
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

export {
    obtenerClientes, obtenerAutomovilesDisponibles, obtenerClientesAlquilando, obtenerReservasPendientes,
    obtenerAlquilerPorId, obtenerEmpleadosPorRol, obtenerCantidadAutomovilesPorSucursal, obtenerCostoAlquiler,
    obtenerClienteEspecifico, obtenerAutomovilesConCapacidadMayorA5, obtenerAlquileresPorFechaDeInicio,
    obtenerReservasPendientesPorCliente, obtenerEmpleadosEspecificos, obtenerClientesConAlMenosUnAlquiler,
    obtenerAutomovilesOrdenados, obtenerCantidadAutomovilesPorUbicacion, obtenerTotalAlquileres,
    obtenerAutomovilesConCapacidadMayorA5Disponibles, obtenerAlquileresPorRangoDeFechas, obtenerCantidadAlquileresActivos,
    obtenerSucursalesConCantidadDeAutomoviles
};
