const models = require("../models");
module.exports = {
  list: {
    get: (req, res) => {
      res.send("GET /heartedItems/list OK");
    }
  },
  add: {
    post: (req, res) => {
      res.send(`POST /heartedItems/add OK ${req.body}`);
    }
  },
  delete: {
    delete: (req, res) => {
      res.send(`DELETE /heartedItems/delete OK ${req.body}`);
    }
  }
};
