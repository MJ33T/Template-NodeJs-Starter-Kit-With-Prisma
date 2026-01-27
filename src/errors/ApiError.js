class ApiError extends Error {
  constructor(status_code, message, stack = "") {
    super(message);
    this.status_code = status_code;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
