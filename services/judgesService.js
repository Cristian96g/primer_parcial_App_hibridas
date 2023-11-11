import Judge from "../models/judgeModel.js";
import Vote from "../models/voteModels.js";

async function getJudges() {
  return await Judge.find({});
}

async function getJudgeVotes(id) {
  if (!id) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const judgeVotes = await Vote.find({ judge_id: id })
    .populate({ path: 'game_id', select: "name" })
    .select('game_id jugabilidad arte sonido afinidad_tematica');

  return {
    success: true,
    judgeVotes,
  };
}

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
