import express, { Application } from 'express';

import userRoutes from '../routes/users';
import authRoutes from '../routes/auth';

import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth : '/api/auth',
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server runing in port ${this.port}`);
        })
    }
}

export default Server;