const db = require("../models");
const fakeData = require("../data/fakeData");
module.exports = {
  list: {
    get: (req, res) => {
      res.json(fakeData);
      // const countryCode = req.query.countryCode;
      // const storeCode = req.query.storeCode;
      // const category = req.query.category;
      // const user_id = req.query.user_id;

      // // db.stores.findAll({where:{}});

      // db.productsinstores
      //   .findAll({
      //     where: { store_id: 1 },
      //     include: [{ model: db.stores }, { model: db.products }]
      //   })
      //   .then(data => {
      //     console.log(data[0].dataValues);
      //     console.log(data.length);
      //   });

      // res.send("GET /products/list OK");
    }
  }
};
