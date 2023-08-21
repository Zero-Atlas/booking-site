const { Schema, model, Types } = require("mongoose");

const hotelSchema = new Schema({
  name: { type: String, required: true },
  cheapestPrice: { type: Number, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: [{ type: String }],
  desc: { type: String },
  rating: { type: Number, required: true },
  featured: { type: String, required: true },
  rooms: [{ type: Types.ObjectId, required: true, ref: "Room" }],
});

module.exports = model("Hotel", hotelSchema);
