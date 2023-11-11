import Vote from '../models/voteModels.js';
import Judge from '../models/judgeModel.js';
import Game from '../models/gameModels.js';

async function getVotes() {
  return await Vote.find({});
}

async function getVoteById(id) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  return await Vote.findById(id)
    .populate({ path: 'judge_id', select: "name" })
    .populate({ path: 'game_id', select: "name" });
}

async function postVote({ judge_id, game_id, jugabilidad, arte, sonido, afinidad_tematica }) {
  if (!judge_id || !game_id || !jugabilidad || !arte || !sonido || !afinidad_tematica) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const existVote = await Vote.findOne({ judge_id, game_id });

  if (existVote) {
    return {
      success: false,
      message: 'El juez ya emitió un voto para este juego'
    };
  }

  const judge = await Judge.findById(judge_id);

  if (!judge) {
    return {
      success: false,
      message: 'El juez no existe'
    };
  }

  const game = await Game.findById(game_id);
  if (!game) {
    return {
      success: false,
      message: 'El juego no existe'
    };
  }

  const vote = new Vote({
    judge_id,
    game_id,
    jugabilidad,
    arte,
    sonido,
    afinidad_tematica
  });

  await vote.save();

  return {
    success: true,
    message: 'Voto creado exitosamente',
    vote
  };
}

export default {
  getVotes,
  getVoteById,
  postVote,
};
