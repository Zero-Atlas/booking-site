const { Schema, Types, model } = require("mongoose");

const roomSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  desc: { type: String, required: true },
  roomNumbers: [{ type: Number, required: true }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  hotelId: { type: Types.ObjectId, required: true, ref: "Hotel" },
});

module.exports = model("Room", roomSchema);
