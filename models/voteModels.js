import mongoose from 'mongoose';

/**
 * Esquema de datos para un voto.
 * @typedef {Object} VoteSchema
 * @property {import('mongoose').Types.ObjectId} judge_id - El ID del juez que emite el voto.
 * @property {import('mongoose').Types.ObjectId} game_id - El ID del juego que recibe el voto.
 * @property {number} gameplay_points - Puntos otorgados al gameplay (entre 1 y 10).
 * @property {number} graphics_points - Puntos otorgados a los gráficos (entre 1 y 10).
 * @property {number} sound_points - Puntos otorgados al sonido (entre 1 y 10).
 */

/**
 * Definición del esquema y el modelo de voto.
 * @type {import('mongoose').Model<Vote>}
 */
const voteSchema = mongoose.Schema({
    judge_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Judge',
        required: true,
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
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
 * @name Vote
 * @type {import('mongoose').Model<Vote>}
 */
const Vote = mongoose.model('Vote', voteSchema);

export default Vote;
