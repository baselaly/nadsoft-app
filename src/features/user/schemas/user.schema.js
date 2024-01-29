import Joi from "joi";
import joiPhone from "joi-phone-number";
import joiCountry from "joi-country";

let customJoi = Joi.extend(joiPhone, joiCountry);

const schema = customJoi.object({
  name: customJoi.string().min(5).max(100).required(),
  age: customJoi.number().integer().min(1).max(100).required(),
  email: customJoi.string().email().min(5).max(100).required(),
  country: customJoi.string().country().min(5).max(200).required(),
  mobile: customJoi.string().phoneNumber({ defaultCountry: "JO", strict: true }).required(),
});

export default schema;

