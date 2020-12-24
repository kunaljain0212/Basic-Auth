const Joi = require("@hapi/joi");

//Register
const registrationValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(data);
};

//Login
const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(data);
};

module.exports.registrationValidator = registrationValidator;
module.exports.loginValidator = loginValidator;
