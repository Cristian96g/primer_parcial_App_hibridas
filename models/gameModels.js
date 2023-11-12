import mongoose from "mongoose";

/**
 * Esquema de datos para un juego.
 * @typedef {Object} GameSchema
 * @property {string} name - Nombre del juego.
 * @property {string} genre - Género del juego.
 * @property {string[]} members - Array de cadenas con los nombres de los participantes.
 * @property {string} edition - Edición del juego.
 * @property {number} score - Puntuación del juego (por defecto es 0).
 */

/**
 * Definición del esquema y el modelo de juego.
 * @type {import('mongoose').Model<GameSchema>}
 */
const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
  },
  edition: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
});

/**
 * Modelo de juego.
 * @typedef {import('mongoose').Model<GameSchema>} Game
 */

/**
 * Exporta el modelo de juego.
 * @type {Game}
 */
const Game = mongoose.model("Game", gameSchema);

export default Game;
