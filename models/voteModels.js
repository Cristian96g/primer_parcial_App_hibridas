/**
 * Importa la biblioteca de Mongoose.
 * @type {import('mongoose')}
 */
import mongoose from "mongoose";

/**
 * Esquema de datos para un voto.
 * @typedef {Object} VoteSchema
 * @property {import('mongoose').Types.ObjectId} judge_id - El ID del juez que emite el voto.
 * @property {import('mongoose').Types.ObjectId} game_id - El ID del juego que recibe el voto.
 * @property {number} jugabilidad - Puntuación de jugabilidad (de 1 a 10).
 * @property {number} arte - Puntuación de arte (de 1 a 10).
 * @property {number} sonido - Puntuación de sonido (de 1 a 10).
 * @property {number} afinidad_tematica - Puntuación de afinidad temática (de 1 a 10).
 */

/**
 * Definición del esquema y el modelo de voto.
 * @type {import('mongoose').Model<VoteSchema>}
 */
const voteSchema = mongoose.Schema({
  judge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judge",
    required: true,
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  jugabilidad: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  arte: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  sonido: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  afinidad_tematica: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});

/**
 * Modelo de voto.
 * @typedef {import('mongoose').Model<VoteSchema>} Vote
 */

/**
 * Modelo de voto.
 * @type {import('mongoose').Model<VoteSchema>}
 */
const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
