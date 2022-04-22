const admin = require("firebase-admin");
const auth = admin.auth();

const getToken = require("../helpers/getToken");

async function verifyToken(req, res, next) {
  //return next(); //undocommend for seeder

  try {
    const token = getToken(req);
    if (token) {
      const decodedToken = await auth.verifyIdToken(token);
      //console.log(decodedToken)
      req.user = decodedToken;
      return next();
    } else {
      res.status(403);
      res.json({ message: "Missing token." });
      return;
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = verifyToken;
