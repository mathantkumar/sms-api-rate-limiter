const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sms.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS sms_requests (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, phone TEXT, timestamp DATETIME)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS rate_limit_violations (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, phone TEXT, violation_type TEXT, timestamp DATETIME)"
  );
});

module.exports = db;
