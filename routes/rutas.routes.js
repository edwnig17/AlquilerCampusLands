import { Router } from "express";
import * as rutasControllers from "../controllers/rutas.controllers.js";

const server = Router();

// Luego puedes acceder a los controladores como propiedades de rutasControllers
server.get("/clients", rutasControllers.getClients);
server.get("/availableCars", rutasControllers.getAvailableCars);
server.get("/rentalsClients", rutasControllers.getRentalsClients);
server.get("/pendingReservations", rutasControllers.getPendingReservations);
server.get("/rentalById", rutasControllers.getRentalById);
server.get("/employeeByRole", rutasControllers.getEmployeeByRole);
server.get("/carCountByBranch", rutasControllers.getCarCountByBranch);
server.get("/rentalCost", rutasControllers.getRentalCost);
server.get("/specificClient", rutasControllers.getSpecificClient);
server.get("/carsGreaterThan5", rutasControllers.getCarsGreaterThan5);
server.get("/rentalStartByDate", rutasControllers.getRentalStartByDate);
server.get("/pendingReservationsByClient", rutasControllers.getPendingReservationsByClient);
server.get("/specificEmployees", rutasControllers.getSpecificEmployees);
server.get("/clientWithAtLeastOneRental", rutasControllers.getClientWithAtLeastOneRental);
server.get("/carsOrdered", rutasControllers.getCarsOrdered);
server.get("/carCountByLocation", rutasControllers.getCarCountByLocation);
server.get("/totalRentals", rutasControllers.getTotalRentals);
server.get("/carsGreaterThan5Available", rutasControllers.getCarsGreaterThan5Available);
server.get("/rentalsByDateRange", rutasControllers.getRentalsByDateRange);
server.get("/activeRentalCount", rutasControllers.getActiveRentalCount);
server.get("/branchesWithCarCount", rutasControllers.getBranchesWithCarCount);

export default server;
