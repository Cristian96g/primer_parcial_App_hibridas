/**
 * Importación de módulos y configuración inicial del servidor.
 */
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza esto con el dominio de tu aplicación de React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

import GamesRouter from "./router/GamesRouter.js";
import JudgesRouter from "./router/JudgesRouter.js";
import VotesRouter from "./router/VotesRouter.js";

/**
 * Puerto de conexión para el servidor. Se obtiene de las variables de entorno o se establece en 3000 por defecto.
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

/**
 * URL de conexión a la base de datos MongoDB. Se obtiene de las variables de entorno.
 * @type {string}
 */
const MONGO_URL = process.env.MONGO_URL;

/**
 * URL del frontend al que se permitirá el acceso a través de CORS. Se obtiene de las variables de entorno.
 * @type {string}
 */
const FRONTEND = process.env.FRONTEND;

/**
 * Middleware para analizar el cuerpo de las solicitudes como objetos JSON.
 */
app.use(express.json());

/**
 * Enrutamiento de las rutas de la API utilizando los enrutadores importados.
 */
app.use("/api", GamesRouter);
app.use("/api", JudgesRouter);
app.use("/api", VotesRouter);

/**
 * Conexión a la base de datos MongoDB utilizando Mongoose.
 */
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Conexión a la base de datos establecida");
    
    /**
     * Inicio del servidor en el puerto especificado.
     */
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos", err);
  });
