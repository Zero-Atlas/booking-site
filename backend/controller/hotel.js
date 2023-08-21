const Hotel = require("../model/hotel");
const Room = require("../model/room");
const Transaction = require("../model/transaction");

exports.getHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Hotel.findById(hotelId)
    .populate("rooms")
    .then((hotel) => {
      return res.send(JSON.stringify(hotel));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      return res.send(JSON.stringify(hotels));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Transaction.find({ hotelId: hotelId })
    .then((trans) => {
      if (trans.length > 0) {
        return res.send(JSON.stringify({ message: "cannot deleted" }));
      } else {
        return Hotel.findById(hotelId)
          .then((hotel) => {
            return Room.deleteMany({ _id: { $in: hotel.rooms } }); // delete all room of hotel
          })
          .then(() => {
            return Hotel.deleteOne({ _id: hotelId });
          });
      }
    })
    .then((result) => {
      return res.send(JSON.stringify({ message: "deleted" }));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUpdateHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  const receive = {
    _id: hotelId,
    address: req.body.address,
    type: req.body.type,
    city: req.body.city,
    cheapestPrice: Number(req.body.cheapestPrice),
    desc: req.body.desc,
    distance: req.body.distance,
    featured: req.body.featured,
    name: req.body.name,
    title: req.body.title,
    rating: (4 + Math.random()).toFixed(1),
  };
  const photos = req.body.photos;
  receive.photos = photos.split(", ").map((url) => url.trim());

  Hotel.findOneAndUpdate({ _id: hotelId }, receive, { new: true })
    .then((result) => {
      // console.log(result);
      return res.send(JSON.stringify({ message: "Hotel Updated" }));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postHotel = (req, res, next) => {
  const receive = {
    address: req.body.address,
    type: req.body.type,
    city: req.body.city,
    cheapestPrice: Number(req.body.cheapestPrice),
    desc: req.body.desc,
    distance: req.body.distance,
    featured: req.body.featured,
    name: req.body.name,
    title: req.body.title,
    rating: (4 + Math.random()).toFixed(1),
  };
  const photos = req.body.photos;
  receive.photos = photos.split(", ").map((url) => url.trim());
  const hotel = new Hotel(receive);

  hotel
    .save()
    .then((result) => {
      return res.send(JSON.stringify({ message: "Hotel added" }));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  Room.findById(roomId)
    .then((room) => {
      return res.send(JSON.stringify(room));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRooms = (req, res, next) => {
  Room.find()
    .then((rooms) => {
      return res.send(JSON.stringify(rooms));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  Transaction.find({ roomId: roomId })
    .then((trans) => {
      if (trans.length > 0) {
        return res.send(JSON.stringify({ message: "cannot deleted" }));
      } else {
        return Room.deleteOne({ _id: roomId }).then((result) => {
          return res.send(JSON.stringify({ message: "deleted" }));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRoom = (req, res, next) => {
  const receive = {
    price: Number(req.body.price),
    desc: req.body.desc,
    maxPeople: req.body.maxPeople,
    title: req.body.title,
    hotelId: req.body.hotelId,
    createdAt: new Date(),
  };
  const roomNumbers = req.body.roomNumbers;
  receive.roomNumbers = roomNumbers.split(",").map((url) => url.trim());
  const room = new Room(receive);

  room
    .save()
    .then(() => {
      return Hotel.findById(receive.hotelId);
    })
    .then((hotel) => {
      hotel.rooms.push(room._id);
      return hotel.save();
    })
    .then((result) => {
      return res.send(JSON.stringify({ message: "Room added" }));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUpdateRoom = (req, res, next) => {
  const receive = {
    _id: req.body.roomId,
    price: Number(req.body.price),
    desc: req.body.desc,
    maxPeople: req.body.maxPeople,
    title: req.body.title,
    hotelId: req.body.hotelId,
    updatedAt: new Date(),
  };

  const roomNumbers = req.body.roomNumbers;
  receive.roomNumbers = roomNumbers.split(",").map((url) => url.trim());

  Room.findById(receive._id)
    .then((room) => {
      return room.updateOne(receive);
    })
    .then((result) => {
      return res.send(JSON.stringify({ message: "Room updated" }));
    })
    .catch((err) => {
      console.log(err);
    });
};
