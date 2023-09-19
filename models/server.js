// ./models/server.js
import express from "express";
import routerRutas from "../routes/rutas.routes.js"; 

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT ;
        this.path = {
            rutas: "/api",
        }
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.path.rutas, routerRutas);
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor levantado en el puerto ${this.port}`);
        });
    }
}

export default Server;
