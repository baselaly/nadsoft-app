export default class ErrorClass extends Error {
  constructor(statusCode, errors) {
    super();
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

