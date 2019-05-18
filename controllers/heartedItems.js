const models = require("../models");
const fakeData = require("../data/fakeDataHearted");
module.exports = {
  list: {
    get: (req, res) => {
      res.send(fakeData);
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
