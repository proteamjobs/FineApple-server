const db = require("../models");
const axios = require("axios");
const phoneFormater = require("phone-number-formats");

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
          console.log("setList :: ", setList);
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

      let url =
        `https://www.apple.com/${countryCode}` +
        `/shop/retail/pickup-message?parts.0=MMQA2KH/A&store=${storeCode}`;

      // MMQA2J/A

      console.log(url);

      axios.get(url).then(result => {
        const getStore = result.data.body.stores[0];
        let contact;
        if (countryCode === "kr") {
          contact = new phoneFormater(getStore.phoneNumber);
          contact.format({ type: "korea" });
          contact = contact.string;
        } else {
          contact = getStore.phoneNumber;
        }
        let storeInfoData = {
          storeName: getStore.storeName,
          address: getStore.address,
          contact: contact,
          image_url: getStore.storeImageUrl
        };
        // console.log(storeInfoData);
        res.json(storeInfoData);
      });
    }
  }
};
