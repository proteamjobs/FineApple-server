const getStoresCrawler = require("../module/getStoresCrawler");
const request = require("request");
const cheerio = require("cheerio");
const parser = require("xml2js");
const jsdom = require("jsdom");
const fs = require("fs");
const { Translate } = require("@google-cloud/translate");

const { JSDOM } = jsdom;
module.exports = {
  crawlerStores: {
    get: (req, res) => {
      async function translateText(text) {
        const translate = new Translate({
          projectId: "fineapple-trans",
          keyFilename:
            "../fineapple-server/config/fineapple-trans-b55f46d9ba7a.json"
        });

        let translation = await translate.translate(text, "ko");
        return translation[0];
      }

      const countries = ["kr", "jp", "hk"];

      // const countries = [
      //   "jp",
      //   "kr",
      //   "sg",
      //   "hk",
      //   "my",
      //   "tw",
      //   "ph",
      //   "nz",
      //   "mo",
      //   "vn",
      //   "th"
      // ];

      countries.forEach(country => {
        request(
          `https://www.apple.com/autopush/${country}/retail/storelist/stores.xml`,
          (err, res, html) => {
            if (!err && res.statusCode === 200) {
              const $ = cheerio.load(html, {
                xmlMode: true
              });
              parser.parseString(
                $.html().toString(),
                { trim: true },
                (err, result) => {
                  result.records.country[0].store.forEach(async store => {
                    let storeName = await (country === "jp" ||
                    country === "mo" ||
                    country === "tw"
                      ? translateText(store.name[0])
                      : store.name[0]);
                    let storeCode = store.appleid[0];
                    let store_latitude = store.latitude[0];
                    let store_longitude = store.longitude[0];
                    request(store.link[0], (error, response, body) => {
                      if (!error && response.statusCode == 200) {
                        const $ = cheerio.load(body, {
                          decodeEntities: false
                        });

                        let store_address3 = "";
                        let store_address2 = "";

                        let way_to_come = $("p.typography-body").html();
                        let store_map_name = $(
                          ".typography-section-headline"
                        ).html();
                        if (country === "jp") {
                          store_address3 = $(".store-street")
                            .first()
                            .html();
                          store_address2 = $(".store-street")
                            .next()
                            .html();
                        } else {
                          store_address3 = $(".store-locality").html();
                          store_address2 = $(".store-street").html();
                        }
                        let store_contact = $(".store-phone").html();
                        let store_days = $(".store-hours-day").html();
                        let store_timings = $(".store-hours-time").html();

                        const { window } = new JSDOM(body);
                        const { document } = new JSDOM("").window;
                        global.document = document;

                        let element = window.document.querySelector(
                          ".image-hero"
                        );
                        let style = window.getComputedStyle(element);
                        let getUrlList = style.backgroundImage;

                        let get_image_url = `https://www.apple.com${getUrlList
                          .slice(4)
                          .slice(0, -1)}`;

                        let query =
                          `insert into stores(store_code, country_code, store_name, ` +
                          `store_map_name, store_address3, store_address2, store_contact, get_image_url, ` +
                          `way_to_come, store_timings, store_days, store_latitude, store_longitude) ` +
                          `values ("${storeCode}", "${country}", "${storeName}", "${store_map_name}", "${store_address3}", ` +
                          `"${store_address2}", "${store_contact}", "${get_image_url}", "${way_to_come}", "${store_timings}", ` +
                          `"${store_days}", "${store_latitude}", "${store_longitude}");\n`;
                        console.log(query);
                        fs.appendFile("db.sql", query, err => {
                          console.log(err);
                        });
                      }
                    });
                  });
                }
              );
            }
          }
        );
      });
      res.send("returnSQLData");
    }
  }
};
