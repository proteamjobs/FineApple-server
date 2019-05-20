const db = require("../models");
const axios = require("axios");
const phoneFormater = require("phone-number-formats");
const setModelCode = require("../module/setModelCode");

const fakeData = require("../data/fakeDataStoreInfo");

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
      // res.send(fakeData);
      const countryCode = req.query.countryCode.toLowerCase();
      const storeCode = req.query.storeCode.toUpperCase();
      let changeModelCode = setModelCode(countryCode);
      let url =
        `https://www.apple.com/${countryCode}` +
        `/shop/retail/pickup-message?parts.0=${changeModelCode}&store=${storeCode}`;
      axios.get(url).then(result => {
        const getStore = result.data.body.stores[0];
        const getHours = getStore.storeHours.hours[0];
        const getLocation = {
          storelatitude: getStore.storelatitude,
          storelongitude: getStore.storelongitude
        };

        // 국가 코드가 kr일 경우 전화번호 포멧 변환
        let contact = "";
        if (countryCode === "kr") {
          contact = new phoneFormater(getStore.phoneNumber);
          contact.format({ type: "korea" });
          contact = contact.string;
        } else {
          contact = getStore.phoneNumber;
        }

        // findOne으로 수정 필요 & 에러 처리 필요
        db.stores.findAll({ where: { store_code: storeCode } }).then(result => {
          let way_to_come = result[0].dataValues.way_to_come;
          let storeInfoData = {
            storeName: getStore.storeName,
            address: getStore.address,
            contact: contact,
            image_url: getStore.storeImageUrl,
            way_to_come: way_to_come,
            storeHours: getHours,
            storeLocation: getLocation
          };
          res.json(storeInfoData);
        });
      });
    }
  }
};

// let temp = {
//   head: {
//     status: "200",
//     data: {}
//   },
//   body: {
//     stores: [
//       {
//         storeEmail: "garosugil@apple.com",
//         storeName: "가로수길",
//         reservationUrl: "http://www.apple.com/kr/retail/garosugil",
//         makeReservationUrl: "http://www.apple.com/kr/retail/garosugil",
//         storeImageUrl:
//           "https://rtlimages.apple.com/cmc/dieter/store/4_3/R692.png?resize=828:*&output-format=jpg",
//         country: "KR",
//         city: "서울",
//         storeNumber: "R692",
//         partsAvailability: {
//           "MTER2FE/A": {
//             storePickEligible: true,
//             storeSearchEnabled: true,
//             storeSelectionEnabled: false,
//             storePickupQuote: "Apple 매장 픽업은 현재 이용할 수 없음",
//             pickupSearchQuote: "픽업 불가",
//             storePickupLabel: "픽업:",
//             partNumber: "MTER2FE/A",
//             purchaseOption: "",
//             ctoOptions: "",
//             storePickupLinkText: "자세한 정보 보기",
//             storePickupProductTitle: "iPhone XS 가죽 케이스 - 포레스트 그린",
//             pickupDisplay: "ineligible"
//           }
//         },
//         phoneNumber: "2-20864600",
//         address: {
//           address: "Apple 가로수길",
//           address3: "압구정로 12길 46",
//           address2: "강남구",
//           postalCode: "06028"
//         },
//         hoursUrl: "http://www.apple.com/kr/retail/garosugil",
//         storeHours: {
//           storeHoursText: "Store Hours",
//           bopisPickupDays: "Days",
//           bopisPickupHours: "Hours",
//           hours: [
//             {
//               storeTimings: "10:00 오전-10:00 오후",
//               storeDays: "월요일-일요일:"
//             }
//           ]
//         },
//         storelatitude: 37.5209,
//         storelongitude: 127.0228,
//         storedistance: 0,
//         storeDistanceVoText: "null from 06028",
//         storelistnumber: 1,
//         storeListNumber: 1
//       }
//     ],
//     overlayInitiatedFromWarmStart: true,
//     viewMoreHoursLinkText: "다른 시간 보기",
//     storesCount: "1",
//     little: false,
//     pickupLocationLabel: "Apple Store: ",
//     pickupLocation: "Apple 가로수길",
//     notAvailableNearby: "가장 가까운 [X] 매장에는 오늘 재고가 없습니다.",
//     notAvailableNearOneStore: "가장 가까운 매장에는 오늘 재고가 없습니다.",
//     warmDudeWithAPU: true
//   }
// };
