const models = require("../models");

module.exports = {
  signin: {
    get: (req, res) => {
      res.send("GET /users/signin OK");
    }
  },
  signup: {
    post: (req, res) => {
      res.send(`POST /users/signup OK ${req.body}`);
    }
  }
};
