import passport from "passport";
import responseHelper from "../utils/responseHelper.js"; // your existing response helper

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return responseHelper.failed(res, "Authentication error", 500);
    }
    if (!user) {
      return responseHelper.failed(res, "Unauthorized", 401);
    }

    req.user = user; // attach the authenticated user to req
    next();
  })(req, res, next);
};

export default auth;
