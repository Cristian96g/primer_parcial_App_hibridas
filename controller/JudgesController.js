/**
 * Importa el servicio de jueces.
 * @type {JudgesService}
 */
import JudgesService from "../services/judgesService.js";

/**
 * Controlador para obtener todos los jueces.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
export const getJudges = async (req, res) => {
  try {
    const judges = await JudgesService.getJudges();
    return res.status(200).send({
      success: true,
      judges,
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
 * Controlador para obtener los votos de un juez por ID.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
export const getJudgeVotes = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await JudgesService.getJudgeVotes(id);

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
 * Controlador para crear un nuevo juez.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
export const postJudge = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await JudgesService.postJudge({ name });

    if (!result) {
      return res.status(400).send({
        success: false,
        message: "El nombre es obligatorio",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Controlador para eliminar un juez por ID.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
export const deleteJudge = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await JudgesService.deleteJudge(id);

    if (!result) {
      return res.status(400).send({
        success: false,
        message: "El ID es obligatorio",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Controlador para actualizar un juez por ID.
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} - Objeto de respuesta Express.
 */
export const updateJudge = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await JudgesService.updateJudge(id, { name });

    if (!result) {
      return res.status(400).send({
        success: false,
        message: "El ID es obligatorio",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Exporta los controladores de jueces.
 * @type {Object}
 */
export default {
  getJudges,
  getJudgeVotes,
  postJudge,
  deleteJudge,
  updateJudge,
};
