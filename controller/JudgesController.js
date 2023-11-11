import JudgesService from '../services/judgesService.js';


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
  }

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
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

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
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

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
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

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
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }


export default {
  getJudges,
  getJudgeVotes,
  postJudge,
  deleteJudge,
  updateJudge,
};
