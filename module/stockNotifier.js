const MySQLEvents = require("mysql-events");
const nodemailer = require("nodemailer");
const db = require("../config/config.json").database;
const models = require("../models");
const comapnyMail = require("../config/config.json").comapnyMail;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: comapnyMail.email,
    pass: comapnyMail.password
  }
});

const dsn = {
  host: db.host,
  user: db.username,
  password: db.password,
  port: db.port
};

const myCon = MySQLEvents(dsn);

let notifyWhenStockComesIn = myCon.add(
  "fineapple.productsinstores",
  async function(oldRow, newRow, event) {
    if (oldRow !== null && newRow !== null) {
      if (oldRow.fields.is_pickup === 0 && newRow.fields.is_pickup === 1) {
        let store_id = newRow.fields.store_id;
        let product_id = newRow.fields.product_id;

        let mailingInfo = await models.heartedItems.findAll({
          where: { store_id: store_id, product_id: product_id },
          include: [
            { model: models.users, attributes: ["email"] },
            { model: models.products, attributes: ["model_info"] },
            { model: models.stores, attributes: ["store_name"] }
          ]
        });

        let recieverEmail = mailingInfo[0].dataValues.user.dataValues.email;
        let model = mailingInfo[0].dataValues.product.dataValues.model_info;
        let store = mailingInfo[0].dataValues.store.dataValues.store_name;
        console.log(recieverEmail, model, store);
        let mailOptions = {
          from: comapnyMail.email,
          to: recieverEmail,
          subject: "Apple의 품절되었던 상품이 입고되었습니다",
          text: `품절되었던 ${model}이(가) Apple Store ${store}점에 입고되었습니다. 매장 픽업이 가능하니 확인해주세요!`
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    }
  }
);

module.export = notifyWhenStockComesIn;
