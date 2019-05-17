const db = require("../models");
const axios = require("axios");
const phoneFormater = require("phone-number-formats");
const setModelCode = require("../module/setModelCode");

phoneFormater.addType("korea", "0X-XXXX-XXXX");
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
    get: (req, res) => {
      const countryCode = req.query.countryCode;
      const storeCode = req.query.storeCode;
      let changeModelCode = setModelCode("MMQA2KH/A", countryCode);

      let url =
        `https://www.apple.com/${countryCode}` +
        `/shop/retail/pickup-message?parts.0=${changeModelCode}&store=${storeCode}`;

      axios.get(url).then(result => {
        const getStore = result.data.body.stores[0];
        const getHours = getStore.storeHours.hours[0];
        let contact;
        if (countryCode === "kr") {
          contact = new phoneFormater(getStore.phoneNumber);
          contact.format({ type: "korea" });
          contact = contact.string;
        } else {
          contact = getStore.phoneNumber;
        }

        db.stores.findAll({ where: { store_code: storeCode } }).then(result => {
          let way_to_come = result[0].dataValues.way_to_come;

          let storeInfoData = {
            storeName: getStore.storeName,
            address: getStore.address,
            contact: contact,
            image_url: getStore.storeImageUrl,
            way_to_come: way_to_come,
            storeHours: getHours
          };

          res.json(storeInfoData);
        });
      });
    }
  }
};
