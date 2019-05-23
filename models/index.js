const Sequelize = require("sequelize");
const SequelizeAuto = require("sequelize-auto");
const db = {};
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const database = require("../config/config.json").database;
const PASSWORD = database.password;
const HOST = database.host;
const USERNAME = database.username;
const DATABASE = database.database;
const DIALECT = database.dialect;
const PORT = database.port;

// const auto = new SequelizeAuto(DATABASE, USERNAME, PASSWORD, {
//   host: HOST,
//   dialect: DIALECT,
//   port: PORT
// });

// auto.run(err => {
//   if (err) throw err;
// });

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
  define: {
    timestamps: false
  }
});

// sequelize.sync();

sequelize.sync({ force: true });

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
