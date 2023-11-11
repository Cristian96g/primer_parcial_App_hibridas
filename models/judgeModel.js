import mongoose from 'mongoose';

/**
 * Esquema de datos para un juez.
 * @typedef {Object} JudgeSchema
 * @property {string} name - El nombre del juez.
 */

/**
 * Definición del esquema y el modelo de juez.
 * @type {import('mongoose').Model<Judge>}
 */
const judgeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
});

/**
 * Modelo de juez.
 * @name Judge
 * @type {import('mongoose').Model<Judge>}
 */
const Judge = mongoose.model('Judge', judgeSchema);

export default Judge;
