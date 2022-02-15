import Joi from "joi";

const schema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  data.updatedAt = new Date();
  result.value = data;
  return result;
};

export default validate;
