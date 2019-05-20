const db = require("../models");
const getDataInApple = require("../module/getDataInApple");
const getHeartedItemsByUser = require("../module/getHeartedItemsByUser");
// const axios = require("axios");
// const fakeData = require("../data/fakeDataHearted");
module.exports = {
  list: {
    get: async (req, res) => {
      // res.send(fakeData);
      const user_id = req.query.userID;

      //------------------------------------------------
      try {
        // Sequlizer Join Data
        let getData = await getHeartedItemsByUser(user_id);

        let getDataAppleAndDB = getData.map(item => {
          const user = item.user.dataValues;
          const product = item.product.dataValues;
          const store = item.store.dataValues;
          const countryCode = item.store.dataValues.country_code.toLowerCase();
          const storeCode = item.store.dataValues.store_code.toUpperCase();
          const modelCode = item.product.dataValues.model_code;

          // Get Data In Apple Module
          let getFunction = async () => {
            return await getDataInApple(countryCode, storeCode, modelCode)
              .then(async data => {
                let getResultData = {
                  productID: product.id,
                  storeID: store.id,
                  modelCode: product.model_code,
                  modelName: product.model_info,
                  imageUrl: product.image,
                  storeCode: store.store_code,
                  countryCode: store.country_code.toLowerCase(),
                  isPickupAvailable: data.data[product.model_code],
                  storeName: data.storeName,
                  isHearted: false
                };

                // Check heartedItems Table
                let getHeartedItemsList = await getHeartedItemsByUser(user_id);
                getHeartedItemsList.map(item => {
                  const getUser_id = item.user.dataValues.id;
                  const product_id = item.product.dataValues.id;
                  const store_id = item.store.dataValues.id;

                  if (
                    parseInt(user_id) === getUser_id &&
                    product.id === product_id &&
                    store.id === store_id
                  ) {
                    getResultData.isHearted = true;
                  }
                });

                return getResultData;
              })
              .catch(err => {
                console.log("ERROR ::: getDataInApple ::: ", err);
                res.send("ERROR ::: heartedItems/list");
              });
          };
          return getFunction();
        });

        //
        let promiseDataList = await Promise.all(getDataAppleAndDB);

        res.status(200).json(promiseDataList);
      } catch (err) {
        console.log("ERROR ::: heartedItems/list ::: ", err);
        res.send("ERROR ::: heartedItems/list");
      }
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

//------------------------------------------------
// let getHeartedItemsByUserData = { data: [] };
// getHeartedItemsByUserData.data = getData.map(item => {
//   const user = item.user.dataValues;
//   const product = item.product.dataValues;
//   const store = item.store.dataValues;

//   return {
//     user,
//     product,
//     store
//   };
// });
// //------------------------------------------------

// let getDataApple = getData.map(async item => {
//   const user = item.user.dataValues;
//   const countryCode = item.store.dataValues.country_code.toLowerCase();
//   const storeCode = item.store.dataValues.store_code.toUpperCase();
//   const modelCode = item.product.dataValues.model_code;

//   return await getDataInApple(countryCode, storeCode, modelCode);
// });
// let getAppleData = await Promise.all(getDataApple);

// //------------------------------------------------
// console.log(getAppleData);
// console.log(getHeartedItemsByUserData);

// //------------------------------------------------
