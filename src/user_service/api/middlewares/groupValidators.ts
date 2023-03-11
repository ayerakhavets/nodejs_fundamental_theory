import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

export const PERMISSIONS = ['DELETE', 'READ', 'SHARE', 'UPLOAD_FILES', 'WRITE'];

const groupSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(40).required(),
  permissions: Joi.array()
    .items(Joi.string().valid(...PERMISSIONS))
    .required(),
});
const joiValidator = createValidator();

export const groupBodyValidator = joiValidator.body(groupSchema);
