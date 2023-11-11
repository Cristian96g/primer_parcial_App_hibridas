import VotesService from '../services/votesService.js';


export const getVotes = async (req, res) => {
    try {
      const votes = await VotesService.getVotes();
      return res.status(200).send({
        success: true,
        votes,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
        error,
      });
    }
  }

  export const getVote = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await VotesService.getVoteById(id);

      if (!result) {
        return res.status(400).send({
          success: false,
          message: "El ID es obligatorio",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  export const postVote = async (req, res) => {
    try {
      const { judge_id, game_id, jugabilidad, arte, sonido, afinidad_tematica } = req.body;
      const result = await VotesService.postVote({ judge_id, game_id, jugabilidad, arte, sonido, afinidad_tematica });

      if (!result) {
        return res.status(400).send({
          success: false,
          message: "Todos los campos son obligatorios",
        });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }


export default {
  getVotes,
  getVote,
  postVote,
}