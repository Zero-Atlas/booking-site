const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors=require('cors')

const userRouter=require('./router/user')
const adminRouter=require('./router/admin')
const homeRouter=require('./router/home')
const hotelRouter=require('./router/hotel')
const searchRouter=require('./router/search')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(userRouter)
app.use(adminRouter)
app.use(homeRouter)
app.use(searchRouter)
app.use(hotelRouter)

mongoose
  .connect(
    "mongodb+srv://anhdfx20137:devildarkness4@cluster0.x0tghbp.mongodb.net/booking?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
