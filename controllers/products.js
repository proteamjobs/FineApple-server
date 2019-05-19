const db = require("../models");
const getDataInApple = require("../module/getDataInApple");
// const fakeData = require("../data/fakeData");
module.exports = {
  test: {
    get: async (req, res) => {
      const storeCode = req.query.storeCode;

      try {
        var store_id = await db.stores.findOne({
          where: { store_code: storeCode },
          attributes: ["id"]
        });
      } catch (err) {
        console.log("ERROR ::: GET STORE ID IN SEQUELIZE ::: ", err);
      }

      res.send(store_id);
    }
  },
  list: {
    get: async (req, res) => {
      // res.json(fakeData);
      const countryCode = req.query.countryCode;
      const storeCode = req.query.storeCode;
      const category = req.query.category.toLowerCase();
      const user_id = req.query.user_id;
      let getDataList = {
        dataList: []
      };

      try {
        // 받아온 쿼리의 storeCode의 실제 id를 받아옴
        let storeData = await db.stores
          .findOne({
            where: { store_code: storeCode },
            attributes: ["id"]
          })
          .catch(err => {
            console.log("ERROR ::: GET storeData ::: ", err);
          });
        let store_id = storeData.dataValues.id;

        // store_id를 기준으로 판매중인 제품 정보들을 가져옴
        let joinTable = await db.productsinstores
          .findAll({
            where: { store_id: store_id },
            include: [{ model: db.stores }, { model: db.products }]
          })
          .catch(err => {
            console.log("ERROR ::: GET joinTable ::: ", err);
          });

        joinTable.map(data => {
          if (data.product.dataValues.category === category) {
            const store = data.store.dataValues;
            const product = data.product.dataValues;
            let list = { store, product };
            getDataList.dataList.push(list);
          }
        });

        // APPLE API에 요청 후 데이터를 받는다.
        let getAppleResultData = await getDataInApple(
          countryCode,
          storeCode,
          getDataList
        );

        let responseData = { productlist: [] };

        // user_id에 따라 DB를 조회하여 제품이 hearted인지 확인
        let getHeartedItemsUser = null;
        if (user_id !== "0") {
          getHeartedItemsUser = await db.heartedItems
            .findAll({
              where: { user_id: user_id },
              include: [
                { model: db.users },
                { model: db.products },
                { model: db.stores }
              ]
            })
            .catch(err => {
              console.log("ERROR ::: GET heartedItems ::: ", err);
            });
        }

        // 각 데이터들을 가공하여 responseData에 삽입
        getDataList.dataList.map(item => {
          const productID = item.product.id;
          const storeID = item.store.id;

          let objProduct = {
            productID: productID,
            storeID: storeID,
            modelCode: item.product.model_code,
            imageUrl: item.product.image,
            storeCode: storeCode,
            countryCode: countryCode,
            isPickupAvailable: getAppleResultData.data[item.product.model_code],
            storeName: getAppleResultData.storeName,
            modelName: item.product.model_info,
            isHearted: false
          };

          // 만약 해당 제품이 user_id & store_id & product_id가 일치하면 isHearted를 true로 전환
          if (getHeartedItemsUser !== null) {
            getHeartedItemsUser.map(data => {
              const user = data.user.dataValues;
              const product = data.product.dataValues;
              const store = data.store.dataValues;
              if (
                user.id === parseInt(user_id) &&
                product.id === productID &&
                store.id === storeID
              ) {
                objProduct.isHearted = true;
              }
            });
          }

          responseData.productlist.push(objProduct);
        });

        res.send(responseData);
      } catch (err) {
        console.log("ERROR ::: SEQUELIZE ::: ", err);
      }
      // res.send("GET /products/list OK");
    }
  }
};
