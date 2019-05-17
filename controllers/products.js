const models = require("../models");
module.exports = {
  list: {
    get: (req, res) => {
      let query = req.query;
      res.send("GET /products/list OK");
    }
  }
};
