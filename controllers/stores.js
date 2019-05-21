const db = require("../models");
const axios = require("axios");
// const phoneFormater = require("phone-number-formats");
// const setModelCode = require("../module/setModelCode");
// phoneFormater.addType("korea", "0X-XXXX-XXXX");

const fakeData = require("../data/fakeDataStoreInfo");

module.exports = {
  list: {
    get: (req, res) => {
      db.stores
        .findAll()
        .then(result => {
          let setList = [];
          result.map(data => {
            setList.push(data.dataValues);
          });
          res.send(setList);
        })
        .catch(err => {
          console.log("ERROR :: GET /stores/list :: ", err);
        });
    }
  },
  info: {
    get: async (req, res) => {
      // res.send(fakeData);
      const storeCode = req.query.storeCode.toUpperCase();

      let getStores = await db.stores.findOne({
        where: { store_code: storeCode }
      });

      let storeInfoData = {
        storeName: getStores.dataValues.store_map_name,
        address: {
          address: getStores.dataValues.store_map_name,
          address3: getStores.dataValues.store_address3,
          address2: getStores.dataValues.store_address2
        },
        contact: getStores.dataValues.store_contact,
        image_url: getStores.dataValues.get_image_url,
        way_to_come: getStores.dataValues.way_to_come,
        storeHours: {
          storeTimings: getStores.dataValues.store_timings,
          storeDays: getStores.dataValues.store_days
        },
        storeLocation: {
          storelatitude: parseFloat(getStores.dataValues.store_latitude),
          storelongitude: parseFloat(getStores.dataValues.store_longitude)
        }
      };

      res.status(200).json(storeInfoData);
    }
  }
};
