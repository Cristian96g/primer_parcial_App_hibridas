import Game from "../models/gameModels.js";
import Vote from "../models/voteModels.js";

/**
 * Obtiene la lista de todos los juegos.
 *
 * @async
 * @function
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de juegos.
 * @throws {Error} Si hay un error al realizar la consulta.
 */
async function getGames() {
  return await Game.find({});
}

/**
 * Obtiene las votaciones para un juego específico, incluyendo información del juez.
 *
 * @async
 * @function
 * @param {string} gameId - ID del juego para el cual se obtienen las votaciones.
 * @returns {Promise<Object|null>} Una promesa que se resuelve con un objeto que contiene el nombre del juego y las votaciones formateadas o null si no se encuentra el juego.
 * @throws {Error} Si no se proporciona un ID de juego o hay un error al realizar la consulta.
 */
async function getVotesForGame(gameId) {
  const game = await Game.findById(gameId);

  if (!game) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const votes = await Vote.find({ game_id: gameId }).populate("judge_id");
  const formattedVotes = votes.map((vote) => ({
    judge_name: vote.judge_id.name,
    jugabilidad: vote.jugabilidad,
    arte: vote.arte,
    sonido: vote.sonido,
    afinidad_tematica: vote.afinidad_tematica,
  }));

  return {
    game_name: game.name,
    votes: formattedVotes,
  };
}

/**
 * Obtiene la lista de juegos ordenada por puntuación en una edición específica.
 *
 * @async
 * @function
 * @param {string} edition - Edición para la cual se desea obtener la lista de juegos ordenada por puntuación.
 * @returns {Promise<Object|null>} Una promesa que se resuelve con un objeto que contiene la lista de juegos ordenada por puntuación o null si no se proporciona una edición.
 * @throws {Error} Si hay un error al realizar la consulta.
 */
async function getGamesSortedByScore(edition) {
  if (!edition) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const games = await Game.find({ edition: edition });

  for (const game of games) {
    game.score = 0;
    const votes = await Vote.find({ game_id: game.id });

    if (votes.length > 0) {
      for (const vote of votes) {
        game.score +=
          vote.jugabilidad + vote.arte + vote.sonido + vote.afinidad_tematica;
      }
    }
  }

  games.sort((a, b) => b.score - a.score);

  return { games };
}

/**
 * Obtiene el puntaje promedio de un juego específico.
 *
 * @async
 * @function
 * @param {string} gameId - ID del juego para el cual se desea obtener el puntaje promedio.
 * @returns {Promise<Object|null>} Una promesa que se resuelve con un objeto que contiene el juego y su puntaje promedio o null si no se encuentra el juego.
 * @throws {Error} Si no se proporciona un ID de juego o hay un error al realizar la consulta.
 */
async function getAverageScoreForGame(gameId) {
  const game = await Game.findById(gameId);

  if (!game) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const votes = await Vote.find({ game_id: gameId });

  if (votes.length === 0) {
    return {
      game,
      average_scores: {
        jugabilidad: 0,
        arte: 0,
        sonido: 0,
        afinidad_tematica: 0,
      },
    };
  }

  const totalVotes = votes.length;
  const sumScores = votes.reduce(
    (acc, vote) => ({
      jugabilidad: acc.jugabilidad + vote.jugabilidad,
      arte: acc.arte + vote.arte,
      sonido: acc.sonido + vote.sonido,
      afinidad_tematica: acc.afinidad_tematica + vote.afinidad_tematica,
    }),
    { jugabilidad: 0, arte: 0, sonido: 0, afinidad_tematica: 0 }
  );

  const averageScores = {
    jugabilidad: sumScores.jugabilidad / totalVotes,
    arte: sumScores.arte / totalVotes,
    sonido: sumScores.sonido / totalVotes,
    afinidad_tematica: sumScores.afinidad_tematica / totalVotes,
  };

  return {
    game,
    average_scores: averageScores,
  };
}

/**
 * Crea un nuevo juego y lo guarda en la base de datos.
 *
 * @async
 * @function
 * @param {Object} gameData - Datos del juego a crear.
 * @param {string} gameData.name - Nombre del juego.
 * @param {string} gameData.genre - Género del juego.
 * @param {number} gameData.members - Número de miembros del juego.
 * @param {string} gameData.edition - Edición del juego.
 * @returns {Promise<Object>} Una promesa que se resuelve con un objeto que indica el resultado de la operación.
 * @throws {Error} Si no se proporcionan todos los datos requeridos.
 */
async function postGame({ name, genre, members, edition }) {
  if (!name || !genre || !members || !edition) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const game = new Game({ name, genre, members, edition });
  await game.save();

  return {
    success: true,
    message: "Juego creado exitosamente",
    game,
  };
}

/**
 * Elimina un juego por su ID de la base de datos.
 *
 * @async
 * @function
 * @param {string} id - ID del juego a eliminar.
 * @returns {Promise<Object|null>} Una promesa que se resuelve con un objeto que indica el resultado de la operación o null si no se proporciona un ID de juego.
 * @throws {Error} Si hay un error al realizar la consulta.
 */
async function deleteGame(id) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  await Game.findByIdAndDelete(id);

  return {
    success: true,
    message: "Juego eliminado exitosamente",
  };
}

/**
 * Actualiza un juego por su ID en la base de datos.
 *
 * @async
 * @function
 * @param {string} id - ID del juego a actualizar.
 * @param {Object} gameData - Datos actualizados del juego.
 * @param {string} gameData.name - Nuevo nombre del juego.
 * @param {string} gameData.genre - Nuevo género del juego.
 * @param {number} gameData.members - Nuevo número de miembros del juego.
 * @param {string} gameData.edition - Nueva edición del juego.
 * @returns {Promise<Object|null>} Una promesa que se resuelve con un objeto que indica el resultado de la operación o null si no se proporciona un ID de juego.
 * @throws {Error} Si hay un error al realizar la consulta.
 */
async function updateGame(id, { name, genre, members, edition }) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  await Game.findByIdAndUpdate(id, { name, genre, members, edition });

  return {
    success: true,
    message: "Juego actualizado exitosamente",
  };
}

/**
 * Exporta las funciones del servicio de juegos.
 */
export default {
  getGames,
  getVotesForGame,
  getGamesSortedByScore,
  getAverageScoreForGame,
  postGame,
  deleteGame,
  updateGame,
};
