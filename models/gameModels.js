import mongoose from 'mongoose';

/**
 * Esquema de datos para un juego.
 * @typedef {Object} GameSchema
 * @property {string} name - El nombre del juego.
 * @property {string} genre - El género del juego.
 */

/**
 * Definición del esquema y el modelo de juego.
 * @type {import('mongoose').Model<Game>}
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
        type: [String], // Un array de cadenas (nombres de participantes)
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
 * @name Game
 * @type {import('mongoose').Model<Game>}
 */
const Game = mongoose.model('Game', gameSchema);

export default Game;
