import PasswordValidator from "password-validator";
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { ERROR_VALIDATING_PASSWORD } from "./constants";

export const joiValidator = createValidator()

export type User = {
  id: string;
  age: number;
  isDeleted: boolean;
  login: string;
  password: string;
};

export const userSchema = Joi.object({
  id: Joi.string().required(),
  age: Joi.number().min(4).max(140).required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
})

const passwordSchema = new PasswordValidator().is().min(6).has().digits(2);
export const passwordValidator = (req, res, next) => {
  const isValidated = passwordSchema.validate(req.body.password, { details: true });

  if (Array.isArray(isValidated) && isValidated.length) {
    const errorMessages: string = isValidated.map((value) => value.message).join("\n");
    res.status(400).send(`${ERROR_VALIDATING_PASSWORD}\n${errorMessages}`);
  } else {
    next();
  }
};
