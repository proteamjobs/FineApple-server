const axios = require("axios");

module.exports = async (country, store, modelData) => {
  // Make URL
  let url =
    `https://www.apple.com/${country}/shop/retail/` +
    `pickup-message?store=${store}`;
  if (modelData.constructor === Object) {
    let modelArr = modelData.dataList;
    for (let i in modelArr) {
      url += `&parts.${i}=${modelArr[i].product.model_code}`;
    }
  } else if (modelData.constructor === String) {
    url += `&parts.0=${modelData}`;
  }

  // console.log(url);
  let returnData = { data: {} };
  try {
    let getAppleData = await axios.get(url).catch(err => {
      console.log("ERROR ::: GET getAppleData ::: ", err);
    });
    let modelDataJson = getAppleData.data.body.stores[0].partsAvailability;
    let modelStoreName = getAppleData.data.body.stores[0].address.address;
    let modelKeyArray = Object.keys(modelDataJson);

    // console.log(modelKeyArray);
    // 각 모델별로 픽업 여부 확인
    modelKeyArray.map(key => {
      let isAvailable = null;
      if (modelDataJson[key].pickupDisplay === "available") {
        isAvailable = true;
      } else if (modelDataJson[key].pickupDisplay === "ineligible") {
        isAvailable = false;
      }
      returnData.data[key] = isAvailable;
    });
    returnData["storeName"] = modelStoreName;
  } catch (err) {
    console.log("ERROR :: getDataInApple in Axios Error :: ", err);
  }

  return returnData;
};
