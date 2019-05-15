const models = require("../models");
module.exports = {
  list: {
    get: (req, res) => {
      res.send("GET /stores/list OK");
    }
  },
  info: {
    get: (req, res) => {
      res.send("GET /stores/info OK");
    }
  }
};
