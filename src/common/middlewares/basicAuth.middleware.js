import ErrorClass from "../classes/error.class.js";
import envConfig from "../config/env.config.js";
import StatusCodeEnum from "../enums/statusCode.enum.js";

export default (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new ErrorClass(StatusCodeEnum.UN_AUTHORIZED, "not authenticated");
    }

    const basicAuthToken = req.headers["authorization"].split(" ");

    // decode base64 to extract username & password
    const decodedCredentials = atob(basicAuthToken[1]);

    const authCredentials = decodedCredentials.split(":");

    // match extracted username & password with what we specify in env file
    if (authCredentials[0] !== envConfig.USER_NAME || authCredentials[1] !== envConfig.PASSWORD) {
      throw new ErrorClass(StatusCodeEnum.UN_AUTHORIZED, "not authenticated");
    }

    next();
  } catch (err) {
    throw new ErrorClass(StatusCodeEnum.UN_AUTHORIZED, "not authenticated");
  }
};

