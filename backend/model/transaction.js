const { Schema, model, Types } = require("mongoose");

const transactionSchema = new Schema({
  userId: { type: Types.ObjectId, required: true, ref: "User" },
  hotelId: { type: Types.ObjectId, required: true, ref: "Hotel" },
  rooms: [
    {
      roomId: { type: Types.ObjectId, required: true, ref:'Room' },
      roomNumber: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = model("Transaction", transactionSchema);
