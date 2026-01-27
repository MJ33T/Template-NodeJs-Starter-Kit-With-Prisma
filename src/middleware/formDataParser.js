import responseHelper from "../utils/responseHelper.js";

// export const formDataParser = (req, res, next) => {
//   try {
//     const method = req.method.toUpperCase();
//     // Only parse for POST, PUT, PATCH requests
//     if (!["POST", "PUT", "PATCH"].includes(method)) {
//       return next();
//     }

//     if (!req.body || !req.body.data) {
//       return responseHelper.failed(res, "Invalid JSON in 'data' field", 422);
//     }

//     if (typeof req.body.data !== "string") {
//       return responseHelper.failed(res, "Invalid JSON in 'data' field", 422);
//     }

//     // Parse JSON safely
//     const parsedData = JSON.parse(req.body.data);

//     req.body = { ...req.body, ...parsedData };
//     delete req.body.data; // Remove the original data field
//     next();
//   } catch (error) {
//     return responseHelper.failed(res, "Invalid JSON in 'data' field", 422);
//   }
// };

export const formDataParser = (req, res, next) => {
  try {
    if (req.body && req.body.data) {
      const parsedData = JSON.parse(req.body.data);
      req.body = { ...req.body, ...parsedData };
      delete req.body.data;
    }
    next();
  } catch (error) {
    return responseHelper.failed(res, "Invalid JSON in 'data' field", 422);
  }
};
