import VotesService from "../services/votesService.js";

/**
 * Controlador para obtener todos los votos.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
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
};

/**
 * Controlador para obtener un voto por ID.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
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
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Controlador para crear un nuevo voto.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
export const postVote = async (req, res) => {
  try {
    const { judge_id, game_id, jugabilidad, arte, sonido, afinidad_tematica } =
      req.body;
    const result = await VotesService.postVote({
      judge_id,
      game_id,
      jugabilidad,
      arte,
      sonido,
      afinidad_tematica,
    });

    if (!result) {
      return res.status(400).send({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default {
  getVotes,
  getVote,
  postVote,
};
