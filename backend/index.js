const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const homeRouter = require("./router/home");
const hotelRouter = require("./router/hotel");
const searchRouter = require("./router/search");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@movie-site.kpkcv1h.mongodb.net/${process.env.MONGO_DATABASE}`;

const app = express();
app.use(
  cors({
    origin: ['https://booking-site-admin.vercel.app', 'https://booking-site-silk.vercel.app'],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  })
);
app.set("trust proxy", 1);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);
app.use(adminRouter);
app.use(homeRouter);
app.use(searchRouter);
app.use(hotelRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
