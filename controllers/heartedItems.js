const db = require("../models");
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
      console.log(req.body);
      const user_id = req.body.userID;
      const product_id = req.body.productID;
      const store_id = req.body.storeID;

      db.heartedItems
        .create({
          user_id: user_id,
          product_id: product_id,
          store_id: store_id
        })
        .then(() => {
          res.send("Done");
        })
        .catch(err => {
          res.send(err);
          console.log("ERROR :: POST /users/signup :: ", err);
        });
    }
  },
  delete: {
    delete: (req, res) => {
      const user_id = req.body.userID;
      const product_id = req.body.productID;
      const store_id = req.body.storeID;

      db.heartedItems
        .destroy({
          where: {
            user_id: user_id,
            product_id: product_id,
            store_id: store_id
          }
        })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.send(err);
          console.log("ERROR :: DELETE /users/delete :: ", err);
        });
    }
  }
};
