const express = require("express");
const cors = require("cors");
const dbQueries = require("./db/queries");
const { minuteLimiter, dayLimiter } = require("./middleware/rateLimiter");
const logger = require("./logger");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options("*", cors());

// Send SMS
app.post("/send-sms", async (req, res) => {
  const { phone } = req.body;
  const ip = req.ip;

  if (!phone) {
    logger.warn(`Invalid request from ${ip}: Missing phone number.`);
    return res.status(400).send("Phone number is required.");
  }

  try {
    await Promise.all([
      minuteLimiter.consume(`${ip}-${phone}`),
      dayLimiter.consume(`${ip}-${phone}`),
    ]);

    const stmt = db.prepare(
      "INSERT INTO sms_requests (ip, phone, timestamp) VALUES (?, ?, ?)"
    );
    stmt.run(ip, phone, new Date().toISOString());
    stmt.finalize();

    logger.info(`SMS sent: ${phone} from ${ip}`);
    res.status(200).send("SMS sent successfully.");
  } catch (rejRes) {
    if (rejRes instanceof RateLimiterRes) {
      const retryAfter = Math.ceil(rejRes.msBeforeNext / 1000);
      dbQueries.logRateLimitViolation(ip, phone, "rate limit exceeded");

      res.set("Retry-After", retryAfter);
      if (rejRes.points === 10) {
        logger.warn(
          `Daily limit exceeded for ${phone} from ${ip}. Retry after ${retryAfter} seconds.`
        );
        return res
          .status(429)
          .send(
            `Daily limit exceeded. Please retry after ${retryAfter} seconds.`
          );
      } else {
        logger.warn(
          `Rate limit exceeded for ${phone} from ${ip}. Retry after ${retryAfter} seconds.`
        );
        return res
          .status(429)
          .send(`Too many requests. Please retry after ${retryAfter} seconds.`);
      }
    }

    logger.error(`Internal server error for ${phone} from ${ip}: ${rejRes}`);
    res.status(500).send("Internal server error");
  }
});

// Get stats
app.get("/stats", async (req, res) => {
  const lastMinuteCount = await dbQueries.getSmsCountInLastMinute();
  const totalLast24HoursCount = await dbQueries.getTotalSmsCountLast24Hours();
  res.json({
    lastMinute: lastMinuteCount,
    totalToday: totalLast24HoursCount,
  });
});

// Get violations
app.get("/violations", async (req, res) => {
  const violations = await dbQueries.getRateLimitViolations();
  res.json(violations);
});

const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
