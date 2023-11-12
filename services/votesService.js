import Vote from "../models/voteModels.js";
import Judge from "../models/judgeModel.js";
import Game from "../models/gameModels.js";

/**
 * Obtiene todos los votos.
 * @async
 * @function
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de votos.
 * @throws {Error} Si hay un error al realizar la consulta.
 */
async function getVotes() {
  return await Vote.find({});
}

/**
 * Obtiene un voto por su ID, poblado con información del juez y el juego.
 * @async
 * @function
 * @param {string} id - ID del voto a buscar.
 * @returns {Promise<Object|null>} Una promesa que se resuelve con el voto encontrado o null si no se encuentra.
 * @throws {Error} Si no se proporciona un ID o hay un error al realizar la consulta.
 */
async function getVoteById(id) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  return await Vote.findById(id)
    .populate({ path: "judge_id", select: "name" })
    .populate({ path: "game_id", select: "name" });
}

/**
 * Crea un nuevo voto y lo guarda en la base de datos.
 * @async
 * @function
 * @param {Object} voteData - Datos del voto a crear.
 * @param {string} voteData.judge_id - ID del juez que emite el voto.
 * @param {string} voteData.game_id - ID del juego al que se le asigna el voto.
 * @param {number} voteData.jugabilidad - Puntuación de jugabilidad.
 * @param {number} voteData.arte - Puntuación de arte.
 * @param {number} voteData.sonido - Puntuación de sonido.
 * @param {number} voteData.afinidad_tematica - Puntuación de afinidad temática.
 * @returns {Promise<Object>} Una promesa que se resuelve con un objeto que indica el resultado de la operación.
 * @throws {Error} Si no se proporcionan todos los datos requeridos o si ya existe un voto para el mismo juez y juego.
 */
async function postVote({
  judge_id,
  game_id,
  jugabilidad,
  arte,
  sonido,
  afinidad_tematica,
}) {
  if (
    !judge_id ||
    !game_id ||
    !jugabilidad ||
    !arte ||
    !sonido ||
    !afinidad_tematica
  ) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const existVote = await Vote.findOne({ judge_id, game_id });

  if (existVote) {
    return {
      success: false,
      message: "El juez ya emitió un voto para este juego",
    };
  }

  const judge = await Judge.findById(judge_id);

  if (!judge) {
    return {
      success: false,
      message: "El juez no existe",
    };
  }

  const game = await Game.findById(game_id);
  if (!game) {
    return {
      success: false,
      message: "El juego no existe",
    };
  }

  const vote = new Vote({
    judge_id,
    game_id,
    jugabilidad,
    arte,
    sonido,
    afinidad_tematica,
  });

  await vote.save();

  return {
    success: true,
    message: "Voto creado exitosamente",
    vote,
  };
}

/**
 * Exporta las funciones del servicio de votos.
 */
export default {
  getVotes,
  getVoteById,
  postVote,
};
