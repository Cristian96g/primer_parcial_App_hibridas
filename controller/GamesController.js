import GamesService from '../services/GamesService.js';


  export const getGames = async (req, res) => {
    try {
      const games = await GamesService.getGames();
      return res.status(200).send({
        success: true,
        games,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
        error: err,
      });
    }
  }

  export const getVotesForGame = async (req, res) => {
    try {
      const gameId = req.params.game_id;
      const result = await GamesService.getVotesForGame(gameId);

      if (!result) {
        return res.status(404).json({ message: 'Juego no encontrado' });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  export const getGamesSortedByScore = async (req, res) => {
    try {
      const edition = req.params.edition;
      const result = await GamesService.getGamesSortedByScore(edition);

      if (!result) {
        return res.status(400).json({ message: 'La edición es requerida' });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  export const getAverageScoreForGame = async (req, res) => {
    try {
      const gameId = req.params.game_id;
      const result = await GamesService.getAverageScoreForGame(gameId);

      if (!result) {
        return res.status(404).json({ message: 'Juego no encontrado' });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  export const postGame = async (req, res) => {
    try {
      const { name, genre, members, edition } = req.body;
      const result = await GamesService.postGame({ name, genre, members, edition });

      if (!result) {
        return res.status(400).send({
          success: false,
          message: "El nombre y el género son obligatorios",
        });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
        error: err,
      });
    }
  }

  export const deleteGame = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await GamesService.deleteGame(id);

      if (!result) {
        return res.status(400).send({
          success: false,
          message: "El ID es obligatorio",
        });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
        error: err,
      });
    }
  }

  export const updateGame = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, genre, members, edition } = req.body;
      const result = await GamesService.updateGame(id, { name, genre, members, edition });

      if (!result) {
        return res.status(400).send({
          success: false,
          message: "El ID es obligatorio",
        });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
        error: err,
      });
    }
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
