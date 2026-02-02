import dotenv from "dotenv";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import prisma from "../config/prisma.js";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true, // 👈 REQUIRED
};

passport.use(
  new JwtStrategy(opts, async (req, jwt_payload, done) => {
    try {
      // 1️⃣ Extract raw token
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

      // 2️⃣ Validate token from DB
      const dbToken = await prisma.userToken.findFirst({
        where: {
          token,
          revoked: false,
          expiresAt: { gt: new Date() },
        },
      });

      if (!dbToken) {
        return done(null, false); // ❌ logged out / expired
      }

      // 3️⃣ Fetch user
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user); // ✅ authenticated
    } catch (err) {
      return done(err, false);
    }
  }),
);

export default passport;
