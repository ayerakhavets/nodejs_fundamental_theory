import PasswordValidator from "password-validator";
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { ERROR_VALIDATING_PASSWORD } from "../../utils/constants";

const passwordSchema = new PasswordValidator().is().min(6).has().digits(2);

/**
 * Validate password to be strong enough.
 * @param req Express req Object
 * @param res Express res Object
 * @param next Express next Function
 */
export const validatePassword = (req, res, next) => {
  const isValidated = passwordSchema.validate(req.body.password, { details: true });
  if (Array.isArray(isValidated) && isValidated.length) {
    const errorMessages: string = isValidated.map((value) => value.message).join("\n");
    res.status(400).send(`${ERROR_VALIDATING_PASSWORD}\n${errorMessages}`);
  } else {
    next();
  }
};

const userSchema = Joi.object({
  id: Joi.string().required(),
  age: Joi.number().min(4).max(140).required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
})
const joiValidator = createValidator();

export const validateBody = joiValidator.body(userSchema)
