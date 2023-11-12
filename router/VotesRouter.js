import express from "express";
import { postVote, getVote, getVotes } from "../controller/VotesController.js";
const VotesRouter = express.Router();

/**
 * Enrutador para gestionar las rutas relacionadas con los jueces.
 * @module VotesRouter
 */

/**
 * Ruta para crear un nuevo voto.
 */
VotesRouter.post("/vote", postVote);

/**
 * Ruta para obtener la lista de todos los votos.
 */
VotesRouter.get("/vote", getVotes);

/**
 * Ruta para obtener un voto por su ID.
 */
VotesRouter.get("/vote/:id", getVote);

export default VotesRouter;
