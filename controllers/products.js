const models = require("../models");
module.exports = {
  list: {
    get: (req, res) => {
      let query = req.query;
      console.log("/products/list QUERY::: ", query);
      res.send("GET /products/list OK");
    }
  }
};
