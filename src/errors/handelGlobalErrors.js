import ApiError from "./ApiError.js";

// Middleware function
const handleGlobalError = (err, req, res, next) => {
  // If the error is an instance of ApiError
  if (err instanceof ApiError) {
    return res.status(err.status_code).json({
      success: false,
      message: err.message,
      status_code: err.status_code,
      meta: null,
      data: null,
    });
  }

  // For unexpected errors
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    status_code: 500,
    meta: null,
    data: null,
  });
};

export default handleGlobalError;
