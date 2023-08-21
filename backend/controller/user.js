const User = require("../model/user");
const Transaction = require("../model/transaction");

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const message = "Your username or password is not correct!";
        return res.status(401).send(JSON.stringify(message));
      }
      if (user.password !== password) {
        const message = "Your username or password is not correct!";
        return res.status(401).send(JSON.stringify(message));
      }

      res.send(JSON.stringify({ id: user._id }));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.username;
  const phoneNumber = "0905432xxx";
  const email = username + "@test.com";
  let message;

  //validation
  User.findOne({ username: username })
    .then((user) => {
      if (user) message = "your username is already exist!";
    })
    .then(() => {
      if (message) {
        return res.status(401).send(JSON.stringify(message));
      }

      //valid user create
      const user = new User({
        username: username,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        isAdmin: false,
      });
      user.save().then((result) => {
        return res.send(JSON.stringify({message:'account created'}))
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.body.userId;
  User.findById(userId)
    .select("-isAdmin")
    .then((user) => {
      return res.send(JSON.stringify(user));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postBooked = (req, res, next) => {
  const inputData = {
    hotelId: req.body.hotelId,
    dateString: req.body.dateString,
    userId: req.body.userId,
    rooms: req.body.rooms,
    total: Number(req.body.total),
    payment: req.body.payment,
  };
  const date = inputData.dateString.split(" to ").map((d) => new Date(d));
  const rooms = inputData.rooms.map((r) => {
    const roomData = r.roomIdentity.split("_room_");
    return { roomId: roomData[0], roomNumber: roomData[1] };
  });
  const transaction = new Transaction({
    userId: inputData.userId,
    hotelId: inputData.hotelId,
    rooms: rooms,
    createdAt: new Date(),
    dateStart: date[0],
    dateEnd: date[1],
    price: inputData.total,
    payment: inputData.payment,
    status: "Booked",
  });

  transaction
    .save()
    .then(() => {
      return res.send(JSON.stringify({ message: "transaction added" }));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTransaction = (req, res, next) => {
  const userId = req.params.userId;
  Transaction.find({ userId: userId })
    .populate("hotelId")
    .then((transList) => {
      const sendTransactionList = transList.map((t) => {
        const roomList = t.rooms.reduce((s, n, index) => {
          if (index !== 0) {
            return (s = s + ", " + n.roomNumber.toString());
          }
          return (s = n.roomNumber.toString());
        }, "");
        return {
          _id: t._id,
          userId: t.userId,
          name: t.hotelId.name
            .toLowerCase()
            .split(" ")
            .map((lt) => lt[0].toUpperCase() + lt.slice(1, lt.length))
            .join(" "),
          room: roomList,
          date: `${t.dateStart.getDate()}/${t.dateStart.getMonth()+1}/${t.dateStart.getFullYear()} - ${t.dateEnd.getDate()}/${t.dateEnd.getMonth()+1}/${t.dateEnd.getFullYear()}`,
          payment: t.payment,
          price: t.price,
          status: t.status,
        };
      });

      return res.send(JSON.stringify(sendTransactionList));
    })
    .catch((err) => {
      console.log(err);
    });
};
