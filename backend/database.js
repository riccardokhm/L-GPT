// Module to handle database operations for chat messages using SQLite
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
      `SELECT role, content FROM messages WHERE sessionId = ? ORDER BY id DESC LIMIT 20`,
      [sessionId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows.reverse()); // Reverse to get chronological order
      }
    );
  });
}

module.exports = {
  saveMessage,
  getMessagesBySession
};