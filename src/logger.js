const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logDirectory = path.join(__dirname, "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "sms_requests.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "violations.log"),
      level: "warn",
    }),
    new winston.transports.Console(),
  ],
});

const logViolation = (ip, phone, violationType) => {
  logger.warn(
    `Rate Limit Violation - IP: ${ip}, Phone: ${phone}, Violation: ${violationType}`
  );
};

module.exports = { logger, logViolation };
