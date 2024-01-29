import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().uuid().required(),
});

export default schema;

