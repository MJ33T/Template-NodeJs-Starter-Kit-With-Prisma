export default class responseHelper {
  static success(res, data = {}, message = "", meta = null, status_code = 200) {
    return res.status(status_code).json({
      success: true,
      message,
      status_code,
      meta: null,
      data,
    });
  }

  static successPagination(
    res,
    data = {},
    message = "",
    meta = null,
    status_code = 200,
  ) {
    return res.status(status_code).json({
      success: true,
      message,
      status_code,
      meta,
      data,
    });
  }

  static failed(res, message = "", status_code = 500) {
    return res.status(status_code).json({
      success: false,
      message,
      status_code,
      meta: null,
      data: null,
    });
  }

  static successMessage(res, message = "", status_code = 200) {
    return res.status(status_code).json({
      success: true,
      message,
      status_code,
      meta: null,
      data: null,
    });
  }
}
