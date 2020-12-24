const Joi = require("@hapi/joi");

//Register Validation
const registrationValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(data);
};

//Login Validation
const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(data);
};

//Password validation
const passwordValidator = (data) => {
  console.log(data);
  const schema = Joi.object({
    oldPassword: Joi.string().required().min(5),
    newPassword: Joi.string().required().min(5),
  });
  console.log(schema.validate(data));
  return schema.validate(data);
};

module.exports.registrationValidator = registrationValidator;
module.exports.loginValidator = loginValidator;
module.exports.passwordValidator = passwordValidator;
