const db = require("./index");

const getSmsCountInLastMinute = async () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT COUNT(*) as count FROM sms_requests WHERE timestamp >= datetime('now', '-1 minute')",
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0].count);
      }
    );
  });
};

const getTotalSmsCountLast24Hours = async () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT COUNT(*) as count FROM sms_requests WHERE timestamp >= datetime('now', '-1 day')",
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0].count);
      }
    );
  });
};

const getRateLimitViolations = async () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT ip, phone, violation_type, timestamp FROM rate_limit_violations WHERE timestamp >= datetime('now', '-1 hour') ORDER BY timestamp DESC",
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

const logRateLimitViolation = (ip, phone, violationType) => {
  const stmt = db.prepare(
    "INSERT INTO rate_limit_violations (ip, phone, violation_type, timestamp) VALUES (?, ?, ?, ?)"
  );
  stmt.run(ip, phone, violationType, new Date().toISOString(), (err) => {
    if (err) {
      console.error(`Error logging rate limit violation: ${err.message}`);
    }
  });
};

module.exports = {
  getSmsCountInLastMinute,
  getTotalSmsCountLast24Hours,
  getRateLimitViolations,
  logRateLimitViolation,
};
