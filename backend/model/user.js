const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

module.exports = model('User',userSchema)