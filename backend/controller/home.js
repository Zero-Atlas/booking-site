const Hotel = require("../model/hotel");

exports.getCity = (req, res, next) => {
  const city = [];
  Hotel.find({ city: "Ha Noi" })
    .then((hotels) => {
      city.push({
        name: "Ha Noi",
        subText: `${hotels.length} properties`,
        image: "./images/city-1.jpg",
      });

      return Hotel.find({ city: "Ho Chi Minh" }).then((hotels) => {
        city.push({
          name: "Ho Chi Minh",
          subText: `${hotels.length} properties`,
          image: "./images/city-2.jpg",
        });

        return Hotel.find({ city: "Da Nang" }).then((hotels) => {
          city.push({
            name: "Da Nang",
            subText: `${hotels.length} properties`,
            image: "./images/city-3.jpg",
          });
        });
      });
    })
    .then(() => {
      return res.send(JSON.stringify(city));
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getType = (req, res, next) => {
  const type = [];
  Hotel.find({ type: "hotel" })
    .then((hotels) => {
      type.push({
        name: "Hotels",
        count: hotels.length,
        image: "./images/type_1.webp",
      });

      return Hotel.find({ type: "apartment" }).then((hotels) => {
        type.push({
          name: "Apartments",
          count: hotels.length,
          image: "./images/type_2.jpg",
        });

        return Hotel.find({ type: "resort" }).then((hotels) => {
          type.push({
            name: "Resorts",
            count: hotels.length,
            image: "./images/type_3.jpg",
          });

          return Hotel.find({ type: "villa" }).then((hotels) => {
            type.push({
              name: "Villas",
              count: hotels.length,
              image: "./images/type_4.jpg",
            });

            return Hotel.find({ type: "cabin" }).then((hotels) => {
              type.push({
                name: "Cabins",
                count: hotels.length,
                image: "./images/type_5.jpg",
              });
            });
          });
        });
      });
    })
    .then(() => {
      return res.send(JSON.stringify(type));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTop = (req, res, next) => {
  Hotel.find()
    .select("name city cheapestPrice photos rating")
    .then((hotels) => {
      const topHotel = hotels.sort((a, b) => b.rating - a.rating).slice(0, 3);
      return res.send(JSON.stringify(topHotel));
    })
    .catch((err) => {
      console.log(err);
    });
};
