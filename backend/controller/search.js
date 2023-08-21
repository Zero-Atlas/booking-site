const Hotel = require("../model/hotel");
const Room = require("../model/room");

exports.postSearch = (req, res, next) => {
  const inputCity = req.body.city;
  const inputStartDate = new Date(req.body.startDate);
  const inputEndDate = req.body.endDate
    ? new Date(req.body.endDate)
    : undefined;
  let inputPeople = Number(req.body.people);
  const inputRooms = Number(req.body.rooms);
  Hotel.find()
    .populate("rooms")
    .then((hotels) => {
      let updateList = hotels;
      if (inputCity) {
        updateList = updateList.filter((h) => h.city === inputCity);
      }

      // get all rooms
      let roomList = [];
      let hotelInfo = [];
      updateList.forEach((h) => {
        hotelInfo.push({
          img: h.photos[0],
          distance: h.distance,
          feature: h.featured,
          type: h.type,
          rating: h.rating,
          hotelId: h._id,
        });
        roomList.push(h.rooms);
      });
      roomList = roomList.map((r, i) =>
        r.map((room) => {
          return { roomInfo: room, hotelInfo: hotelInfo[i] };
        })
      );
      roomList = roomList.flat();

      //filter by people and rooms
      if (inputRooms && roomList !== []) {
        roomList = roomList.filter(
          (r) => r.roomInfo.roomNumbers.length >= inputRooms
        );
        inputPeople = inputPeople / inputRooms;
      }
      if (inputPeople && roomList !== []) {
        roomList = roomList.filter((r) => r.roomInfo.maxPeople >= inputPeople);
      }

      //filter by date
      if (inputEndDate && roomList !== []) {
        roomList = roomList.filter((r) => {
          if (!r.roomInfo.updatedAt) {
            return r.roomInfo.createdAt.getTime() <= inputStartDate.getTime();
          } else {
            return r.roomInfo.updatedAt.getTime() <= inputStartDate.getTime();
          }
        });
      }

      return res.send(JSON.stringify(roomList));
    })
    .catch((err) => {
      console.log(err);
    });
};
