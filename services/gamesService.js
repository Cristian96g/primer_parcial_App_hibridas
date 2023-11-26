import { MongoClient, ObjectId } from "mongodb";

/**
 * Cliente MongoDB utilizado para la conexión a la base de datos.
 * @type {MongoClient}
 */
const client = new MongoClient('mongodb://127.0.0.1:27017');

/**
 * Objeto de base de datos MongoDB.
 * @type {import('mongodb').Db}
 */
const db = client.db('parcial_1');

/**
 * Colección de juegos en la base de datos.
 * @type {import('mongodb').Collection}
 */
const GameCollection = db.collection('games');

/**
 * Convierte un objeto de filtro en un objeto de filtro compatible con MongoDB.
 * @param {Object} filter - Objeto de filtro.
 * @returns {Object} Objeto de filtro compatible con MongoDB.
 */
function filterQueryToMongo(filter) {
  const mongoFilter = {};

  for (const field in filter) {
    if (isNaN(filter[field])) {
      mongoFilter[field] = filter[field];
    } else {
      const [fieldName, op] = field.split('_');

      if (!op) {
        mongoFilter[fieldName] = parseInt(filter[field]);
      } else if (op === 'min') {
        mongoFilter[fieldName] = { $gte: parseInt(filter[field]) };
      } else if (op === 'max') {
        mongoFilter[fieldName] = { $lte: parseInt(filter[field]) };
      }
    }
  }

  return mongoFilter;
}

/**
 * Obtiene la lista de juegos filtrados según los criterios proporcionados.
 * @param {Object} [filter={}] - Criterios de filtrado.
 * @returns {Promise<Object[]>} Lista de juegos.
 */
async function getGames(filter = {}) {
  await client.connect();

  const mongoFilter = filterQueryToMongo(filter);

  return await GameCollection.find(mongoFilter).toArray();
}

/**
 * Obtiene los votos de un juego por su ID.
 * @param {string} gameId - ID del juego.
 * @returns {Promise<Object|null>} Objeto que contiene los votos del juego o nulo si el juego no existe.
 */
async function getVotesForGame(gameId) {
  await client.connect();

  const game = GameCollection.findOne({ _id: ObjectId(gameId) });

  if (!game) {
    return null;
  }

  // Obtener los votos para el juego
  const votes = await db.collection('votes').find({ game_id: gameId }).toArray();

  // Formatear los votos
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
 * @param {string} edition - Edición de los juegos.
 * @returns {Promise<Object|null>} Lista de juegos ordenada por puntuación o nulo si no se proporciona la edición.
 */
async function getGamesSortedByScore(edition) {
  await client.connect();

  if (!edition) {
    return null;
  }

  const games = await GameCollection.find({ edition: edition }).toArray();

  for (const game of games) {
    game.score = 0;
    const votes = await db.collection('votes').find({ game_id: game._id }).toArray();

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
 * Obtiene el promedio de puntuación de un juego.
 * @param {string} gameId - ID del juego.
 * @returns {Promise<Object|null>} Información del juego con su promedio de puntuación o nulo si el juego no existe.
 */
async function getAverageScoreForGame(gameId) {
  await client.connect();

  const game = await GameCollection.findOne({ _id: ObjectId(gameId) });

  if (!game) {
    return null;
  }

  const votes = await db.collection('votes').find({ game_id: gameId }).toArray();

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
 * Crea un nuevo juego en la base de datos.
 * @param {Object} game - Información del juego a crear.
 * @returns {Promise<Object|null>} Resultado de la operación de creación o nulo si falta información del juego.
 */
async function postGame({ name, genre, members, edition }) {
  await client.connect();

  if (!name || !genre || !members || !edition) {
    return null;
  }

  const game = { name, genre, members, edition };
  await GameCollection.insertOne(game);

  return {
    success: true,
    message: "Juego creado exitosamente",
    game,
  };
}

/**
 * Elimina un juego por su ID.
 * @param {string} id - ID del juego a eliminar.
 * @returns {Promise<Object|null>} Resultado de la operación de eliminación o nulo si no se proporciona el ID.
 */
async function deleteGame(id) {
  await client.connect();

  if (!id) {
    return null;
  }

  await GameCollection.deleteOne({ _id: new ObjectId(id) });

  return {
    success: true,
    message: "Juego eliminado exitosamente",
  };
}

/**
 * Actualiza la información de un juego por su ID.
 * @param {string} id - ID del juego a actualizar.
 * @param {Object} update - Información actualizada del juego.
 * @returns {Promise<Object|null>} Resultado de la operación de actualización o nulo si no se proporciona el ID.
 */
async function updateGame(id, { name, genre, members, edition }) {
  await client.connect();

  if (!id) {
    return null;
  }

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (genre) {
    updateFields.genre = genre;
  }
  if (members) {
    updateFields.members = members;
  }
  if (edition) {
    updateFields.edition = edition;
  }

  await GameCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

  return {
    success: true,
    message: "Juego actualizado exitosamente",
  };
}

export default {
  getGames,
  getVotesForGame,
  getGamesSortedByScore,
  getAverageScoreForGame,
  postGame,
  deleteGame,
  updateGame,
};