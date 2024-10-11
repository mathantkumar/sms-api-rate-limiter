const { RateLimiterMemory } = require("rate-limiter-flexible");

const minuteLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
});

const dayLimiter = new RateLimiterMemory({
  points: 10,
  duration: 86400,
});

module.exports = { minuteLimiter, dayLimiter };
