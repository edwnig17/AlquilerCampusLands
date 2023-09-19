import { MongoClient, ObjectId } from 'mongodb';
const url = "mongodb+srv://edwingstiven2023:1234@clusteralquilercarros.u8pfibm.mongodb.net/alquiler_carros";
const client = new MongoClient(url);

async function connect() {
    try {
        await client.connect();
        console.log("Conexión a MongoDB establecida correctamente");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

connect();

const db = client.db("alquiler_carros");

const getClients = async (req, res) => {
    try {
        const collection = db.collection("clients");
        const response = await collection.find().toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getAvailableCars = async (req, res) => {
    try {
        const collection = db.collection("automobiles");
        const response = await collection.find({ "state": "available" }).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getRentalsClients = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "client",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $match: {
                    "state": "active"
                }
            },
            {
                $project: {
                    "client": 1,
                    "state": 1
                }
            }
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getPendingReservations = async (req, res) => {
    try {
        const collection = db.collection("reservations");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "client_id",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $lookup: {
                    from: "automobiles",
                    localField: "car",
                    foreignField: "_id",
                    as: "car"
                }
            },
            {
                $match: {
                    "state": "pending"
                }
            },
            {
                $project: {
                    "client": 1,
                    "state": 1,
                    "car": 1
                }
            }
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getRentalById = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "client",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $lookup: {
                    from: "automobiles",
                    localField: "car",
                    foreignField: "_id",
                    as: "car"
                }
            },
            {
                $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch"
                }
            },
            {
                $match: {
                    "_id": new ObjectId("65072d74de2beed4af0d1c5d")
                }
            },
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getEmployeeByRole = async (req, res) => {
    try {
        const collection = db.collection("employees");
        const response = await collection.find({ "role": "Salesperson" }).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getCarCountByBranch = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch"
                }
            },
            {
                $unwind: "$branch"
            },
            {
                $group: {
                    _id: "$branch.name",
                    totalCars: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    totalCars: 1
                },
            },
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getRentalCost = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const projection = { projection: { "cost": 1 } };
        const response = await collection.find({ "_id": new ObjectId("65072d74de2beed4af0d1c5d") }, projection).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getSpecificClient = async (req, res) => {
    try {
        const collection = db.collection("clients");
        const response = await collection.find({ "dni": 12345678 }).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getCarsGreaterThan5 = async (req, res) => {
    try {
        const collection = db.collection("automobiles");
        const response = await collection.find({ "capacity": { $gt: 5 } }).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getRentalStartByDate = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "client",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $lookup: {
                    from: "automobiles",
                    localField: "car",
                    foreignField: "_id",
                    as: "car"
                }
            },
            {
                $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch"
                }
            },
            {
                $match: {
                    "start_date": new Date("2023-07-05")
                }
            }
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getPendingReservationsByClient = async (req, res) => {
    try {
        const collection = db.collection("reservations");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "client_id",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $lookup: {
                    from: "automobiles",
                    localField: "car",
                    foreignField: "_id",
                    as: "car"
                }
            },
            {
                $match: {
                    "state": "pending",
                    "client_id": new ObjectId("6506fadbde2beed4af0d1c34")
                }
            }
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getSpecificEmployees = async (req, res) => {
    try {
        const collection = db.collection("employees");
        const response = await collection.find({ "role": { $in: ["Manager", "Assistant"] } }).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getClientWithAtLeastOneRental = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "client",
                    foreignField: "_id",
                    as: "client_info"
                }
            },
            {
                $unwind: "$client_info"
            },
            {
                $group: {
                    _id: "$client_info._id",
                    name: { $first: "$client_info.name" },
                    numRentals: { $sum: 1 }
                }
            },
            {
                $match: {
                    numRentals: { $gte: 1 }
                }
            }
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getCarsOrdered = async (req, res) => {
    try {
        const collection = db.collection("automobiles");
        const response = await collection.find().sort({ "make": 1, "model": 1 }).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getCarCountByLocation = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch"
                }
            },
            {
                $unwind: "$branch"
            },
            {
                $group: {
                    _id: "$branch.address",
                    totalCars: {
                        $sum: 1
                    },
                    location: { $first: "$branch.location" }
                }
            },
            {
                $project: {
                    totalCars: 1,
                    location: 1
                },
            },
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getTotalRentals = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $group: {
                    _id: null,
                    totalRentals: {
                        $sum: 1
                    },
                }
            },
            {
                $project: {
                    totalRentals: 1
                },
            },
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getCarsGreaterThan5Available = async (req, res) => {
    try {
        const collection = db.collection("automobiles");
        const response = await collection.find({ "capacity": { $gte: 5 }, "state": "available" }).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}
const getRentalsByDateRange = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "client",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $lookup: {
                    from: "automobiles",
                    localField: "car",
                    foreignField: "_id",
                    as: "car"
                }
            },
            {
                $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch"
                }
            },
            {
                $match: {
                    "start_date": {
                        $gte: new Date("2023-07-05"),
                        $lte: new Date("2023-07-10")
                    }
                }
            }
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

const getActiveRentalCount = async (req, res) => {
    try {
        const collection = db.collection("rentals");
        const response = await collection.countDocuments({ "state": "active" });
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}



const getBranchesWithCarCount = async (req, res) => {
    try {
        const collection = db.collection("automobiles");
        const response = await collection.aggregate([
            {
                $group: {
                    _id: "$branch",
                    totalCars: {
                        $sum: 1
                    }
                }
            },
            {
                $lookup: {
                    from: "branches",
                    localField: "_id",
                    foreignField: "_id",
                    as: "branch"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "name": "$branch.name",
                    "location": "$branch.location",
                    "totalCars": 1
                }
            }
        ]).toArray();
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: "f" });
        console.log(error);
    }
}

export {
    getClients, getAvailableCars, getRentalsClients, getPendingReservations, getRentalById, getEmployeeByRole, getCarCountByBranch,
    getRentalCost, getSpecificClient, getCarsGreaterThan5, getRentalStartByDate, getPendingReservationsByClient, getSpecificEmployees,
    getClientWithAtLeastOneRental, getCarsOrdered, getCarCountByLocation, getTotalRentals, getCarsGreaterThan5Available,
    getRentalsByDateRange, getActiveRentalCount, getBranchesWithCarCount
};






