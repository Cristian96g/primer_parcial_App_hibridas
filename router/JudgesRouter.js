import express from "express";
import {
  getJudges,
  postJudge,
  deleteJudge,
  updateJudge,
  getJudgeVotes,
} from "../controller/JudgesController.js";
const JudgesRouter = express.Router();

/**
 * Enrutador para gestionar las rutas relacionadas con los jueces.
 * @module JudgesRouter
 */

/**
 * Ruta para obtener la lista de todos los jueces.
 */
JudgesRouter.get("/judge", getJudges);

/**
 * Ruta para obtener los votos de un juez por su ID.
 */
JudgesRouter.get("/judge/:id/votes", getJudgeVotes);

/**
 * Ruta para crear un nuevo juez.
 */
JudgesRouter.post("/judge", postJudge);

/**
 * Ruta para eliminar un juez por su ID.
 */
JudgesRouter.delete("/judge/delete/:id", deleteJudge);

/**
 * Ruta para actualizar un juez por su ID.
 */
JudgesRouter.put("/judge/update/:id", updateJudge);

export default JudgesRouter;
