import Game from "../models/gameModels.js";
import Vote from "../models/voteModels.js";

async function getGames() {
  return await Game.find({});
}

async function getVotesForGame(gameId) {
  const game = await Game.findById(gameId);

  if (!game) {
    return null; // o lanzar una excepción según tu lógica de manejo de errores
  }

  const votes = await Vote.find({ game_id: gameId }).populate('judge_id');
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
        game.score += vote.jugabilidad + vote.arte + vote.sonido + vote.afinidad_tematica;
      }
    }
  }

  games.sort((a, b) => b.score - a.score);

  return { games };
}

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

export default {
  getGames,
  getVotesForGame,
  getGamesSortedByScore,
  getAverageScoreForGame,
  postGame,
  deleteGame,
  updateGame,
};
