import yup from "yup";

const judgeSchema = yup.object({
  name: yup.string().min(3, "Ingrese mas de 3 letras").required(),
});

export default judgeSchema;
