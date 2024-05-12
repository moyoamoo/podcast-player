import Joi from "joi";

export const passwordSchema = {
  password: Joi.string().min(4).required().label("Password"),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .label("repeat password")
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),
};

export const emailSchema = {
  newEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  repeatEmail: Joi.string().required().valid(Joi.ref("newEmail")).messages({
    "any.only": "Emails do not match",
    "any.required": "Confirm email is required",
  }),
};


export const loginSchema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(4).required(),
};

export const signUpSchema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(4).required(),
};