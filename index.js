const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const cors = require("cors");
const PORT = 3000;
// Middle Ware
const app = express();
// app.use(express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const productRouter = require("./Routes/Product.Routes");
const usersRouter = require("./Routes/Users.Routes");


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Routes
app.use("/products", productRouter);
app.use("/users", usersRouter);

// Run DB and server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
