const admin = require("firebase-admin");

module.exports = function makeDb() {
  try {
    const db = admin.firestore();
    return db;
  } catch (e) {
    throw e;
  }
};
