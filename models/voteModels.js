import yup from "yup";

const voteSchema = yup.object({
  judge_id: yup.string().required(),
  game_id: yup.string().required(),
  jugabilidad: yup.number().min(1).max(10).required(),
  arte: yup.number().min(1).max(10).required(),
  sonido: yup.number().min(1).max(10).required(),
  afinidad_tematica: yup.number().min(1).max(10).required(),
});


export default voteSchema;

// const voteSchema = mongoose.Schema({
//   judge_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Judge",
//     required: true,
//   },
//   game_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Game",
//     required: true,
//   },
//   jugabilidad: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 10,
//   },
//   arte: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 10,
//   },
//   sonido: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 10,
//   },
//   afinidad_tematica: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 10,
//   },
// });

;
