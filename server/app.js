const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

// database connection to mongodb compass
//  const url='mongodb://localhost/ProductDBex'

const app = express();
app.use(cors());

//database connection to mongodb atlas
const dbConfig = config.get('PRODUCT.dbConfig.dbName');

mongoose.connect(dbConfig, { useNewUrlParser: true})
  // .then(() => {
  //   console, log("connected to database");
  // })
  // .catch((err) => {
  //   console.log("not connected to database", err);
  // });

const con = mongoose.connection;

con.on("open", () => {
  console.log("connected");
});

app.use(express.json());

const productRouter = require("./routes/product");
const registerRouter = require("./routes/register");

app.use("/products", productRouter);
app.use("/registers", registerRouter);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("server started");
});
