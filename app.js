const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const stockNotifier = require("./module/stockNotifier.js");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const storesRouter = require("./routes/stores");
const productsRouter = require("./routes/products");
const heartedItemsRouter = require("./routes/heartedItems");
const devAPIRouter = require("./routes/dev");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/stores", storesRouter);
app.use("/products", productsRouter);
app.use("/heartedItems", heartedItemsRouter);
app.use("/dev", devAPIRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening to port ${PORT}...`));

module.exports = app;
