import express from "express";
const GamesRouter = express.Router();
import {
  getGames,
  getVotesForGame,
  getGamesSortedByScore,
  getAverageScoreForGame,
  postGame,
  deleteGame,
  updateGame,
} from "../controller/GamesController.js";

/**
 * Enrutador para gestionar las rutas relacionadas con los juegos.
 * @module GamesRouter
 */

/**
 * Ruta para obtener la lista de todos los juegos.
 */
GamesRouter.get("/", getGames);

/**
 * Ruta para obtener las votaciones de un juego.
 */
GamesRouter.get("/game/:game_id/votes", getVotesForGame);

/**
 * Ruta para obtener la lista de juegos ordenada por puntuación en una edición específica.
 */
GamesRouter.get("/game/:edition/sort", getGamesSortedByScore);

/**
 * Ruta para obtener el promedio de puntuación de un juego.
 */
GamesRouter.get("/games/:game_id/average-score", getAverageScoreForGame);

/**
 * Ruta para crear un nuevo juego.
 */
GamesRouter.post("/game", postGame);

/**
 * Ruta para eliminar un juego por su ID.
 */
GamesRouter.delete("/game/delete/:id", deleteGame);

/**
 * Ruta para actualizar un juego por su ID.
 */
GamesRouter.put("/game/update/:id", updateGame);

export default GamesRouter;
