import { MongoClient, ObjectId } from "mongodb";

/**
 * Cliente MongoDB utilizado para la conexión a la base de datos.
 * @type {MongoClient}
 */
const client = new MongoClient("mongodb://127.0.0.1:27017");

/**
 * Objeto de base de datos MongoDB.
 * @type {import('mongodb').Db}
 */
const db = client.db("parcial_1");

/**
 * Colección de jueces en la base de datos.
 * @type {import('mongodb').Collection}
 */
const JudgeCollection = db.collection("judges");

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
      const [fieldName, op] = field.split("_");

      if (!op) {
        mongoFilter[fieldName] = parseInt(filter[field]);
      } else if (op === "min") {
        mongoFilter[fieldName] = { $gte: parseInt(filter[field]) };
      } else if (op === "max") {
        mongoFilter[fieldName] = { $lte: parseInt(filter[field]) };
      }
    }
  }

  return mongoFilter;
}

/**
 * Obtiene la lista de jueces filtrados según los criterios proporcionados.
 * @param {Object} [filter={}] - Criterios de filtrado.
 * @returns {Promise<Object[]>} Lista de jueces.
 */
async function getJudges(filter = {}) {
  await client.connect();

  const mongoFilter = filterQueryToMongo(filter);

  return await JudgeCollection.find(mongoFilter).toArray();
}

/**
 * Obtiene los votos de un juez por su ID.
 * @param {string} judgeId - ID del juez.
 * @returns {Promise<Object>} Objeto que contiene los votos del juez.
 */
async function getJudgeVotes(judgeId) {
  await client.connect();

  const db = client.db("nombre_de_tu_base_de_datos");

  if (!judgeId) {
    return { success: false, message: "ID del juez no proporcionado" };
  }

  // Obtener los votos del juez
  const judgeVotes = await db
    .collection("votes")
    .find({ judge_id: new ObjectId(judgeId) })
    .project({
      game_id: 1,
      jugabilidad: 1,
      arte: 1,
      sonido: 1,
      afinidad_tematica: 1,
    })
    .toArray();

  // Poblar la información de los juegos referenciados
  const populatedVotes = await Promise.all(
    judgeVotes.map(async (vote) => {
      const game = await db
        .collection("games")
        .findOne({ _id: new ObjectId(vote.game_id) });
      return {
        game: { _id: game._id, name: game.name },
        jugabilidad: vote.jugabilidad,
        arte: vote.arte,
        sonido: vote.sonido,
        afinidad_tematica: vote.afinidad_tematica,
      };
    })
  );

  return {
    success: true,
    judgeVotes: populatedVotes,
  };
}

/**
 * Crea un nuevo juez en la base de datos.
 * @param {Object} judge - Información del juez a crear.
 * @returns {Promise<Object>} Resultado de la operación de creación.
 */
async function postJudge(judge) {
  await client.connect();

  if (!judge) {
    return null;
  }
  const newJudge = { ...judge };

  await JudgeCollection.insertOne(judge);

  return {
    success: true,
    message: "Juez creado exitosamente",
    newJudge,
  };
}

/**
 * Elimina un juez por su ID.
 * @param {string} id - ID del juez a eliminar.
 * @returns {Promise<Object>} Resultado de la operación de eliminación.
 */
async function deleteJudge(id) {
  await client.connect();

  if (!id) {
    return null;
  }

  await JudgeCollection.deleteOne({ _id: new ObjectId(id) });

  return {
    success: true,
    message: "Juez eliminado exitosamente",
  };
}

/**
 * Actualiza la información de un juez por su ID.
 * @param {string} id - ID del juez a actualizar.
 * @param {Object} update - Información actualizada del juez.
 * @returns {Promise<Object>} Resultado de la operación de actualización.
 */
async function updateJudge(id, { name }) {
  await client.connect();
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  await JudgeCollection.updateOne({ _id: new ObjectId(id) }, { $set: { name: name } });

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
