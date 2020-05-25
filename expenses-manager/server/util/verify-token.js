const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.ACESS_TOKEN_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(403).json({
      success: false,
      message: "Error: No authentication token provided",
    });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      next({ status: 403, message: "Failed to authenticate token.", error });
    } else {
      req.userID = decoded.userID;
      next();
    }
  });
}

module.exports = verifyToken;
