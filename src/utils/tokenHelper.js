import crypto from "crypto";
import moment from "moment";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "default_secret";
const TOKEN_EXPIRES_HOURS = process.env.TOKEN_EXPIRES_HOURS || 24;

/**
 * Generate a hashed token tied to user
 * @param {number} userId
 * @returns {Object} { token, expiresAt }
 */
export function generateToken(userId) {
  const randomPart = crypto.randomBytes(20).toString("hex");
  const payload = `${userId}:${randomPart}:${Date.now()}:${TOKEN_SECRET}`;
  const token = crypto.createHash("sha256").update(payload).digest("hex");

  const expiresAt = moment().add(TOKEN_EXPIRES_HOURS, "hours").toDate();

  return { token, expiresAt };
}
