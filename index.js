import express from "express";
import GamesRouter from "./router/GamesRouter.js";
import JudgesRouter from "./router/JudgesRouter.js";
import VotesRouter from "./router/VotesRouter.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json()); // interpreta el body cuando viene un JSON
app.use(express.static("public"));

/**
 * Enrutamiento de las rutas de la API utilizando los enrutadores importados.
 */
app.use("/api", GamesRouter);
app.use("/api", JudgesRouter);
app.use("/api", VotesRouter);

app.listen(2023, () => {
  console.log(`Servidor iniciado en el puerto 2023`);
});
