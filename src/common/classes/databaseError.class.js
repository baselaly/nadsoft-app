import DatabaseErrorCodeEnum from "../enums/databaseErrorCode.enum.js";
import StatusCodeEnum from "../enums/statusCode.enum.js";
import ErrorClass from "./error.class.js";

export default class DatabaseError {
  constructor(code) {
    switch (code) {
      case DatabaseErrorCodeEnum.DATA_NOT_FOUND:
        return new ErrorClass(StatusCodeEnum.BAD_REQUEST, "invalid payload");
      case DatabaseErrorCodeEnum.ENTRY_HAS_CHILD:
        return new ErrorClass(StatusCodeEnum.FORBIDDEN, "entry has childs");
      case DatabaseErrorCodeEnum.INVALID_DATA:
        return new ErrorClass(StatusCodeEnum.BAD_REQUEST, "invalid payload");
      case DatabaseErrorCodeEnum.DUPLICATE_ENTRY:
        return new ErrorClass(StatusCodeEnum.BAD_REQUEST, "try to enter duplicate entry");
      case DatabaseErrorCodeEnum.RECORD_FOR_OPERATION_NOT_FOUND:
        return new ErrorClass(StatusCodeEnum.BAD_REQUEST, "invalid record for action");
      case DatabaseErrorCodeEnum.TABLE_NOT_FOUND:
        return new ErrorClass(StatusCodeEnum.INTERNAL_SERVER_ERROR, "table not found");
      default:
        return new ErrorClass(StatusCodeEnum.INTERNAL_SERVER_ERROR, "something went wrong");
    }
  }
}

