import Joi from "joi"
import { loginSchema } from "./joiSchemas";

export const onFormInput = async (e, schema, userInput, setUserInput, setErrors) => {
    const newUserInput = { ...userInput, [e.target.id]: e.target.value };
    setUserInput(newUserInput);
    const _joiInstance = Joi.object(schema).options({
      stripUnknown: true,
    });

    try {
      await _joiInstance.validateAsync(newUserInput);
      setErrors(undefined);
    } catch (e) {
      const newErrors = {};
      e.details.forEach((error) => {
        newErrors[error.context.key] = error.message;
      });

      setErrors(newErrors);
      console.log(newUserInput);
    }
  };

