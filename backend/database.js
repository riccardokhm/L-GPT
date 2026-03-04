import sqlite3 from 'sqlite3'

sqlite3.verbose();

const db = new sqlite3.Database('./chat.db');

function saveMessage(sessionId, role, content) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO messages (sessionId, role, content) VALUES (?, ?, ?)",
      [sessionId, role, content],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getMessagesBySession(sessionId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT role, content FROM messages WHERE sessionId = ? ORDER BY timestamp ASC",
      [sessionId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

module.exports = {
  saveMessage,
  getMessagesBySession
};