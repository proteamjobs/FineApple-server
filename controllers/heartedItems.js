const db = require("../models");
const getDataInApple = require("../module/getDataInApple");
// const getHeartedItemsByUser = require("../module/getHeartedItemsByUser");
const axios = require("axios");

const fakeData = require("../data/fakeDataHearted");
module.exports = {
  list: {
    get: async (req, res) => {
      res.send(fakeData);
      // const user_id = req.query.userID;

      // try {
      //   let getData = await db.heartedItems.findAll({
      //     where: { user_id: user_id },
      //     include: [
      //       { model: db.users },
      //       { model: db.products },
      //       { model: db.stores }
      //     ]
      //   });

      //   let getHeartedItemsByUserData = { data: [] };
      //   getData.map(async item => {
      //     const user = item.user.dataValues;
      //     const product = item.product.dataValues;
      //     const store = item.store.dataValues;
      //     const countryCode = store.country_code.toLowerCase();
      //     const storeCode = store.store_code.toUpperCase();
      //     const modelCode = product.model_code;

      //     console.log("----1----");
      //     await getDataInApple(countryCode, storeCode, modelCode).then(data => {
      //       console.log("-----!!--", data);
      //       let getData = {
      //         productID: product.id,
      //         storeID: store.id,
      //         modelCode: product.model_code,
      //         modelName: product.model_info,
      //         imageUrl: product.image,
      //         storeCode: store.store_code,
      //         countryCode: store.country_code.toLowerCase(),
      //         isPickupAvailable: data.data[product.model_code],
      //         storeName: data.storeName
      //       };
      //       console.log("----3----");

      //       getHeartedItemsByUserData.data.push(getData);
      //       console.log("----4----");
      //     });
      //     console.log("----5----");
      //   });

      //   // res.send(getHeartedItemsByUserData);
      // } catch (err) {
      //   console.log("ERROR ::: heartedItems/list ::: ", err);
      // }

      // res.send("GET /heartedItems/list OK");
    }
  },
  add: {
    post: (req, res) => {
      console.log(req.body);
      const user_id = req.body.userID;
      const product_id = req.body.productID;
      const store_id = req.body.storeID;
      let returnData = { response: "", isDone: false };

      db.heartedItems
        .findAll({
          where: {
            user_id: user_id,
            product_id: product_id,
            store_id: store_id
          }
        })
        .then(data => {
          // console.log(data);
          if (data.length > 0) {
            returnData.response = "Status Code 201, Response Already Data!";
            res.status(201).json(returnData);
          } else {
            db.heartedItems
              .create({
                user_id: user_id,
                product_id: product_id,
                store_id: store_id
              })
              .then(() => {
                returnData.response = "Status Code 201, Response OK!";
                returnData.isDone = true;
                res.status(201).send(returnData);
              })
              .catch(err => {
                res.send(err);
                console.log("ERROR :: POST /users/signup :: ", err);
              });
          }
        });
    }
  },
  delete: {
    delete: (req, res) => {
      const user_id = req.body.userID;
      const product_id = req.body.productID;
      const store_id = req.body.storeID;
      let returnData = { response: "", isDone: false };

      db.heartedItems
        .findAll({
          where: {
            user_id: user_id,
            product_id: product_id,
            store_id: store_id
          }
        })
        .then(data => {
          if (data.length === 0) {
            returnData.response = "Status Code 201, Response No Data!";
            res.status(201).send(returnData);
          } else {
            db.heartedItems
              .destroy({
                where: {
                  user_id: user_id,
                  product_id: product_id,
                  store_id: store_id
                }
              })
              .then(() => {
                returnData.response = "Status Code 201, Response OK!";
                returnData.isDone = true;
                res.status(201).json(returnData);
              })
              .catch(err => {
                res.send(err);
                console.log("ERROR :: DELETE /users/delete :: ", err);
              });
          }
        });
    }
  }
};
