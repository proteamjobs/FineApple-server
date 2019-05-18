const axios = require("axios");

module.exports = async (country, store, modelArr) => {
  // Make URL

  let url =
    `https://www.apple.com/${country}/shop/retail/` +
    `pickup-message?store=${store}`;

  for (let i in modelArr) {
    url += `&parts.${i}=${modelArr[i]}`;
  }
  console.log(url);
  let returnData = { data: {} };
  await axios
    .get(url)
    .then(data => {
      let modelDataJson = data.data.body.stores[0].partsAvailability;
      let modelStoreName = data.data.body.stores[0].address.address;
      // console.log(modelStoreName);
      let modelKeyArray = Object.keys(modelDataJson);
      console.log(modelKeyArray);
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
    })
    .catch(err => {
      console.log("ERROR :: getDataInApple in Axios Error :: ", err);
    });

  return returnData;
};
