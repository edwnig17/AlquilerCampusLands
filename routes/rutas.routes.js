import { Router } from "express";
import * as controladoresRutas from "../controllers/rutas.controllers.js";

const enrutador = Router();

enrutador.get("/clientes", controladoresRutas.obtenerClientes);
enrutador.get("/automovilesDisponibles", controladoresRutas.obtenerAutomovilesDisponibles);
enrutador.get("/clientesAlquilando", controladoresRutas.obtenerClientesAlquilando);
enrutador.get("/reservasPendientes", controladoresRutas.obtenerReservasPendientes);
enrutador.get("/alquilerPorId", controladoresRutas.obtenerAlquilerPorId);
enrutador.get("/empleadosPorRol", controladoresRutas.obtenerEmpleadosPorRol);
enrutador.get("/cantidadAutomovilesPorSucursal", controladoresRutas.obtenerCantidadAutomovilesPorSucursal);
enrutador.get("/costoAlquiler", controladoresRutas.obtenerCostoAlquiler);
enrutador.get("/clienteEspecifico", controladoresRutas.obtenerClienteEspecifico);
enrutador.get("/automovilesConCapacidadMayorA5", controladoresRutas.obtenerAutomovilesConCapacidadMayorA5);
enrutador.get("/alquileresPorFechaDeInicio", controladoresRutas.obtenerAlquileresPorFechaDeInicio);
enrutador.get("/reservasPendientesPorCliente", controladoresRutas.obtenerReservasPendientesPorCliente);
enrutador.get("/empleadosEspecificos", controladoresRutas.obtenerEmpleadosEspecificos);
enrutador.get("/clientesConAlMenosUnAlquiler", controladoresRutas.obtenerClientesConAlMenosUnAlquiler);
enrutador.get("/automovilesOrdenados", controladoresRutas.obtenerAutomovilesOrdenados);
enrutador.get("/cantidadAutomovilesPorUbicacion", controladoresRutas.obtenerCantidadAutomovilesPorUbicacion);
enrutador.get("/totalAlquileres", controladoresRutas.obtenerTotalAlquileres);
enrutador.get("/automovilesConCapacidadMayorA5Disponibles", controladoresRutas.obtenerAutomovilesConCapacidadMayorA5Disponibles);
enrutador.get("/alquileresPorRangoDeFechas", controladoresRutas.obtenerAlquileresPorRangoDeFechas);
enrutador.get("/cantidadAlquileresActivos", controladoresRutas.obtenerCantidadAlquileresActivos);
enrutador.get("/sucursalesConCantidadDeAutomoviles", controladoresRutas.obtenerSucursalesConCantidadDeAutomoviles);


export default enrutador;
