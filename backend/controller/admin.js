const User = require("../model/user");
const Transaction = require("../model/transaction");
const { isValidObjectId } = require("mongoose");

exports.useAdminAuth = (req, res, next) => {
  const adminId = req.params.adminId;

  User.find({ isAdmin: true }).then((users) => {
    const loggedAdmin = users.filter(
      (u) => u._id.toString() === adminId.toString()
    )[0];
    // console.log(loggedAdmin);
    if (loggedAdmin) {
      return next();
    } else {
      return res.status(401).send({ message: "Admin not logged in!" });
    }
  });
};

exports.postAdmin = (req, res, next) => {
  const adminId = req.body.adminId;
  if (!isValidObjectId(adminId)){
    return res.send(JSON.stringify({ message: "Not a valid admin Id" }));
  }
  User.findById(adminId)
    .then((user) => {
      if (!user) {
        return res.send(JSON.stringify({ message: "Not logged in" }));
      }
      if (!user.isAdmin) {
        return res.send(
          JSON.stringify({ message: "This account is not an admin" })
        );
      }
      return res.send(JSON.stringify(user));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(401).send(JSON.stringify("Your username or password is not correct!"));
      }
      if (user.password !== password) {
        return res.status(401).send(JSON.stringify("Your username or password is not correct!"));
      }
      if (!user.isAdmin) {
        return res.status(401).send(JSON.stringify("This account is not an admin!"));
      }

      res.send(JSON.stringify({ id: user._id }));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTransaction = (req, res, next) => {
  const page = Number(req.query.page);
  Transaction.find()
    .populate("hotelId userId")
    .then((transList) => {
      const sendTransactionList = transList
        .sort((a, b) => {
          // console.log(b.dateStart.getTime() , a.dateStart.getTime())
          return b.createdAt.getTime() - a.createdAt.getTime();
        })
        .slice((page - 1) * 8, page * 8)
        .map((t) => {
          //get roomNumber string
          const roomList = t.rooms.reduce((s, n, index) => {
            if (index !== 0) {
              return (s = s + ", " + n.roomNumber.toString());
            }
            return (s = n.roomNumber.toString());
          }, "");

          return {
            _id: t._id,
            username: t.userId.fullName,
            name: t.hotelId.name
              .toLowerCase()
              .split(" ")
              .map((lt) => lt[0].toUpperCase() + lt.slice(1, lt.length))
              .join(" "),
            room: roomList,
            date: `${t.dateStart.getDate()}/${
              t.dateStart.getMonth() + 1
            }/${t.dateStart.getFullYear()} - ${t.dateEnd.getDate()}/${
              t.dateEnd.getMonth() + 1
            }/${t.dateEnd.getFullYear()}`,
            payment: t.payment,
            price: t.price,
            status: t.status,
          };
        });
      return res.send(
        JSON.stringify({
          data: sendTransactionList,
          maxPage: Math.ceil(transList.length / 8),
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
