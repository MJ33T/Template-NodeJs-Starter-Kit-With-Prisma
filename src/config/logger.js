import fs from "fs";
import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

/**
 * Environment
 */
const environment = process.env.NODE_ENV || "development";

/**
 * DailyRotateFile handles daily rotation
 * 30-day cleanup automatically via maxFiles: "30d"
 */

// @config: Set the log directory
const logDirectory = path.join(process.cwd(), "logs"); // dont use "getRootPath" function here
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

/**
 * Custom colors
 */
const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "cyan",
  verbose: "blue",
  debug: "magenta",
  silly: "gray",
};

winston.addColors(customColors);

/**
 * Winston helpers
 */
const splat = winston.format.splat();
const rawLevel = Symbol.for("level");
const colorizer = winston.format.colorize();

const errorsWithStack = winston.format.errors({
  stack: environment === "development",
});

/**
 * Keys to redact
 */
const redactKeys = [
  "password",
  "pass",
  "token",
  "authorization",
  "apikey",
  "x-api-key",
  "secret",
  "client_secret",
];

/**
 * Timestamp format
 */
const timestampFormat = winston.format.timestamp({
  format: () => new Date().toISOString(),
});

/**
 * Redact sensitive information
 */
const redact = winston.format((info) => {
  const mask = (value) => {
    if (!value || typeof value !== "object") return value;
    if (Array.isArray(value)) return value.map(mask);

    const obj = {};
    for (const [key, val] of Object.entries(value)) {
      if (redactKeys.includes(key.toLowerCase())) {
        obj[key] = "[REDACTED]";
      } else {
        obj[key] = mask(val);
      }
    }
    return obj;
  };

  if (typeof info.message === "object") {
    info.message = mask(info.message);
  }

  const { message, level, timestamp, stack, ...rest } = info;
  const meta = mask(rest);

  return {
    message,
    level,
    timestamp,
    stack,
    ...meta,
  };
});

/**
 * Console log format
 */
const consoleFormat = winston.format.printf((info) => {
  const { timestamp, env, logger } = info;

  const raw = info[rawLevel] || info.level;
  const upper = String(raw).toUpperCase();
  const levelLabel = colorizer.colorize(raw, upper);

  const msg =
    typeof info.message === "object"
      ? JSON.stringify(info.message)
      : String(info.message ?? "");

  const meta = env || logger ? JSON.stringify({ env, logger }) : "";

  const stack = info.stack ? `\n${info.stack}` : "";

  return `[${levelLabel}] ${timestamp} | ${msg}${
    meta ? ` | META: ${meta}` : ""
  }${stack ? `\nSTACK: ${stack}` : ""}`;
});

/**
 * Console transport
 */
const makeConsoleTransport = (level) =>
  new winston.transports.Console({
    level,
    format: winston.format.combine(
      timestampFormat,
      errorsWithStack,
      splat,
      redact(),
      consoleFormat,
    ),
  });

/**
 * Rotating file transport
 */
const makeRotateFileTransport = (basename, level) => {
  const dir = path.join(logDirectory, basename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new DailyRotateFile({
    level,
    dirname: dir,
    filename: `%DATE%-${basename}.log`,
    datePattern: "DD-MM-YYYY",
    zippedArchive: true,
    maxSize: "50m",
    maxFiles: "30d",
    auditFile: path.join(dir, `.audit-${basename}.json`),
    createSymlink: true,
    symlinkName: `${basename}.log`,
    format: winston.format.combine(
      timestampFormat,
      errorsWithStack,
      splat,
      redact(),
      consoleFormat,
    ),
  });
};

/**
 * Logger factory
 */
const createLogger = (level, filename) => {
  return winston.createLogger({
    level,
    levels: winston.config.npm.levels,
    defaultMeta: {
      env: environment,
      logger: filename,
    },
    transports: [
      makeConsoleTransport(level),
      makeRotateFileTransport(filename, level),
    ],
    exitOnError: false,
  });
};

/**
 * Export loggers
 */
export const infoLogger = createLogger("info", "combined");
export const httpLogger = createLogger("http", "http");
export const errorLogger = createLogger("error", "error");
