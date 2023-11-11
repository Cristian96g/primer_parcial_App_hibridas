import express from 'express';
import { postVote, getVote, getVotes } from '../controller/VotesController.js';
const VotesRouter = express.Router();

/**
 * Enrutador para gestionar las rutas relacionadas con los jueces.
 * @module VotesRouter
 */

/**
 * Ruta para crear un nuevo voto.
 * @name POST /vote
 * @function
 * @param {Object} req - Objeto de solicitud con los datos del voto a crear.
 * @param {Object} res - Objeto de respuesta.
 */

VotesRouter.post('/vote', postVote);

VotesRouter.get('/vote', getVotes);


/**
 * Ruta para obtener un voto por su ID.
 * @name GET /vote/:id
 * @function
 * @param {Object} req - Objeto de solicitud con el ID del voto a obtener.
 * @param {Object} res - Objeto de respuesta.
 */

VotesRouter.get('/vote/:id', getVote);

export default VotesRouter;
