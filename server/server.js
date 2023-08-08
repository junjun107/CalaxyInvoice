const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const invoiceRoute = require("./routes/invoiceRoute");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", invoiceRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(
      PORT,
      console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
    );
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
