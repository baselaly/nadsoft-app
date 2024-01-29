import ErrorClass from "../classes/error.class.js";
import StatusCodeEnum from "../enums/statusCode.enum.js";

export default (schema, path = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[path]);

    if (error) {
      // Serialize Errors
      const errors = error.details.map((detail) => detail.message);

      // pass first error to CustomError Class
      next(new ErrorClass(StatusCodeEnum.BAD_REQUEST, errors[0]));
    }

    next();
  };
};

