import passport from "passport";
import responseHelper from "../utils/responseHelper.js";

export default function authMiddleware(req, res, next) {
  passport.authenticate("bearer", { session: false }, (err, user) => {
    if (err) {
      return responseHelper.failed(res, err.message, 500);
    }

    if (!user) {
      return responseHelper.failed(res, "Unauthorized", 401);
    }

    req.user = user; // 👈 exactly like Laravel Auth::user()
    next();
  })(req, res, next);
}
