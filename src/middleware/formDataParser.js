import responseHelper from "../utils/responseHelper.js";

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
