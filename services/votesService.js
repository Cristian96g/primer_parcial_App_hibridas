import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("parcial_1");
const GameCollection = db.collection("votes");

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

async function getVotes(filter = {}) {
  await client.connect();

  const mongoFilter = filterQueryToMongo(filter);

  return await GameCollection.find(mongoFilter).toArray();
}

async function getVoteById(id) {
  // Conectar a la base de datos
  await client.connect();

  // Obtener el voto por ID
  const vote = await db.collection("votes").findOne({ _id: new ObjectId(id) });

  if (!vote) {
    return null; // o manejar el error según tu lógica
  }

  // Obtener información del juez
  const judge = await db
    .collection("judges")
    .findOne({ _id: new ObjectId(vote.judge_id) });

  // Obtener información del juego
  const game = await db
    .collection("games")
    .findOne({ _id: new ObjectId(vote.game_id) });

  return {
    _id: vote._id,
    jugabilidad: vote.jugabilidad,
    arte: vote.arte,
    sonido: vote.sonido,
    afinidad_tematica: vote.afinidad_tematica,
    judge: { _id: judge._id, name: judge.name }, // Información del juez
    game: { _id: game._id, name: game.name }, // Información del juego
  };
}

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

  // Conectar a la base de datos
  await client.connect();

  // Verificar que el juez exista
  const judge = await db
    .collection("judges")
    .findOne({ _id: new ObjectId(judge_id) });

  if (!judge) {
    return {
      success: false,
      message: "El juez no existe",
    };
  }

  // Verificar que el juego exista
  const game = await db
    .collection("games")
    .findOne({ _id: new ObjectId(game_id) });
  if (!game) {
    return {
      success: false,
      message: "El juego no existe",
    };
  }

  // Verificar que el juez no haya votado por el juego
  const existVote = await db.collection("votes").findOne({ judge_id, game_id });

  if (existVote) {
    return {
      success: false,
      message: "El juez ya emitió un voto para este juego",
    };
  }

  // Crear el voto
  const vote = {
    judge_id,
    game_id,
    jugabilidad,
    arte,
    sonido,
    afinidad_tematica,
  };

  await db.collection("votes").insertOne(vote);

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
