const { RateLimiterMemory } = require("rate-limiter-flexible");

const limiter = {
  minute: new RateLimiterMemory({
    points: 3,
    duration: 60,
  }),
  day: new RateLimiterMemory({
    points: 10,
    duration: 86400,
  }),
};

module.exports = limiter;
