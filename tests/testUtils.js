const jwt = require("jsonwebtoken");

function generateTestToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "testsecret", {
    expiresIn: "1h",
  });
}

module.exports = {
  generateTestToken,
};
