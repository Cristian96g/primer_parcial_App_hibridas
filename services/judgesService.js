import Judge from "../models/judgeModel.js";
import Vote from "../models/voteModels.js";

/**
 * Obtiene todos los jueces.
 * @async
 * @function
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array de jueces.
 */
async function getJudges() {
  return await Judge.find({});
}

/**
 * Obtiene los votos de un juez por ID.
 * @async
 * @function
 * @param {string} id - El ID del juez.
 * @returns {Promise<Object>} - Una promesa que se resuelve con un objeto que contiene los votos del juez.
 */
async function getJudgeVotes(id) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const judgeVotes = await Vote.find({ judge_id: id })
    .populate({ path: "game_id", select: "name" })
    .select("game_id jugabilidad arte sonido afinidad_tematica");

  return {
    success: true,
    judgeVotes,
  };
}

/**
 * Crea un nuevo juez.
 * @async
 * @function
 * @param {Object} param0 - Un objeto que contiene el nombre del juez.
 * @param {string} param0.name - El nombre del juez.
 * @returns {Promise<Object|null>} - Una promesa que se resuelve con el juez creado o null si no se proporciona un nombre.
 */
async function postJudge({ name }) {
  if (!name) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const judge = new Judge({ name });
  await judge.save();

  return {
    success: true,
    message: "Juez creado exitosamente",
    judge,
  };
}

/**
 * Elimina un juez por ID.
 * @async
 * @function
 * @param {string} id - El ID del juez.
 * @returns {Promise<Object|null>} - Una promesa que se resuelve con un objeto que indica el éxito de la operación o null si no se proporciona un ID.
 */
async function deleteJudge(id) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  await Judge.findByIdAndDelete(id);

  return {
    success: true,
    message: "Juez eliminado exitosamente",
  };
}

/**
 * Actualiza un juez por ID.
 * @async
 * @function
 * @param {string} id - El ID del juez.
 * @param {Object} param1 - Un objeto que contiene el nuevo nombre del juez.
 * @param {string} param1.name - El nuevo nombre del juez.
 * @returns {Promise<Object|null>} - Una promesa que se resuelve con un objeto que indica el éxito de la operación o null si no se proporciona un ID.
 */
async function updateJudge(id, { name }) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  await Judge.findByIdAndUpdate(id, { name });

  return {
    success: true,
    message: "Juez actualizado exitosamente",
  };
}

export default {
  getJudges,
  getJudgeVotes,
  postJudge,
  deleteJudge,
  updateJudge,
};
