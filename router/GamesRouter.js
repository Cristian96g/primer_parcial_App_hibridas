import express from 'express';
// const Game = require('../models/gameModels');
const GamesRouter = express.Router();
import { getGames, getVotesForGame, getGamesSortedByScore, getAverageScoreForGame, postGame, deleteGame, updateGame } from '../controller/GamesController.js';

/**
 * Enrutador para gestionar las rutas relacionadas con los juegos.
 * @module GamesRouter
 */

/**
 * Ruta para obtener la lista de todos los juegos.
 * @name GET /
 * @function
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */

GamesRouter.get('/', getGames);


/**
 * Ruta para obtener las votaciones de un juego.
 * @name GET /game/:game_id/votes
 * @function
 * @param {Object} req - Objeto de solicitud con el ID del juego.
 * @param {Object} res - Objeto de respuesta.
 */
GamesRouter.get('/game/:game_id/votes', getVotesForGame);

// Juegos ordenados por sort
GamesRouter.get('/game/:edition/sort', getGamesSortedByScore);

GamesRouter.get('/games/:game_id/average-score', getAverageScoreForGame);
/**
 * Ruta para crear un nuevo juego.
 * @name POST /game
 * @function
 * @param {Object} req - Objeto de solicitud con los datos del juego a crear.
 * @param {Object} res - Objeto de respuesta.
 */

GamesRouter.post('/game', postGame);



/**
 * Ruta para eliminar un juego por su ID.
 * @name DELETE /game/delete/:id
 * @function
 * @param {Object} req - Objeto de solicitud con el ID del juego a eliminar.
 * @param {Object} res - Objeto de respuesta.
 */

GamesRouter.delete('/game/delete/:id', deleteGame);

/**
 * Ruta para actualizar un juego por su ID.
 * @name PUT /game/update/:id
 * @function
 * @param {Object} req - Objeto de solicitud con el ID del juego a actualizar y los datos actualizados.
 * @param {Object} res - Objeto de respuesta.
 */

GamesRouter.put('/game/update/:id', updateGame);

export default GamesRouter;
