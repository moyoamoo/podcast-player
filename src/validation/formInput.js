import Joi from "joi"
import { emailSchema } from "./joiSchemas";

export const onFormInput = async (e, userInput, setUserInput, setErrors) => {
    const newUserInput = { ...userInput, [e.target.id]: e.target.value };
    setUserInput(newUserInput);
    const _joiInstance = Joi.object(emailSchema).options({
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