const models = require("../models");
module.exports = {
  list: {
    get: (req, res) => {
      res.send("GET /products/list OK");
    }
  }
};
