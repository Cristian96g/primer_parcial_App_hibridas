import express from 'express';
import { getJudges, postJudge, deleteJudge, updateJudge, getJudgeVotes } from '../controller/JudgesController.js';
const JudgesRouter = express.Router();

/**
 * Enrutador para gestionar las rutas relacionadas con los jueces.
 * @module JudgesRouter
 */

/**
 * Ruta para obtener la lista de todos los jueces.
 * @name GET /
 * @function
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */

JudgesRouter.get('/judge', getJudges);

JudgesRouter.get('/judge/:id/votes', getJudgeVotes);

/**
 * Ruta para crear un nuevo juez.
 * @name POST /judge
 * @function
 * @param {Object} req - Objeto de solicitud con los datos del juez a crear.
 * @param {Object} res - Objeto de respuesta.
 */

JudgesRouter.post('/judge', postJudge);

/**
 * Ruta para eliminar un juez por su ID.
 * @name DELETE /judge/delete/:id
 * @function
 * @param {Object} req - Objeto de solicitud con el ID del juez a eliminar.
 * @param {Object} res - Objeto de respuesta.
 */

JudgesRouter.delete('/judge/delete/:id', deleteJudge);

/**
 * Ruta para actualizar un juez por su ID.
 * @name PUT /judge/update/:id
 * @function
 * @param {Object} req - Objeto de solicitud con el ID del juez a actualizar y los datos actualizados.
 * @param {Object} res - Objeto de respuesta.
 */

JudgesRouter.put('/judge/update/:id', updateJudge);

export default JudgesRouter;
