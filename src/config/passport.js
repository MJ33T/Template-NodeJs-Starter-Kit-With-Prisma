import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import prisma from "./prisma.js";

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const tokenRecord = await prisma.userToken.findFirst({
        where: {
          token,
          revoked: false,
          expiresAt: { gt: new Date() },
        },
      });

      if (!tokenRecord) return done(null, false);

      const user = await prisma.user.findUnique({
        where: { id: tokenRecord.userId },
      });

      if (!user) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
