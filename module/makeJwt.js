const jwt = require("jsonwebtoken");
const secret = require("../config/config.json").jwtSecret;

module.exports = async user_id => {
  const p = new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: user_id
      },
      secret,
      {
        expiresIn: "7d",
        issuer: "fineapple.me",
        subject: "userInfo"
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
  return p;
};
