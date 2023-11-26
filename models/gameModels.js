import yup from "yup";

const gameSchema = yup.object({
  name: yup.string().min(5, "Ingresa mas de 5 letras").required(),
  genre: yup.string().required(),
  members: yup.array().of(yup.string()),
  edition: yup.string(),
  score: yup.number().default(0),
});

export default gameSchema;
