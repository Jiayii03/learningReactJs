import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import connectDB from './connectMongoDb.js';

// data imports
import User from "./models/User.js";
import { dataUser } from './data/index.js';

/* CONFIGURATION */
dotenv.config();

const app = express(); // node JS framework
app.use(express.json()); // middleware to parse JSON request bodies
app.use(helmet()); // security purposes
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // configures request logging in a specific format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

connectDB()

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})
