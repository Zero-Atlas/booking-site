import { Form, useRouteLoaderData } from "react-router-dom";

import classes from "./BookingForm.module.css";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import RoomCard from "./Content/RoomCard";

export default function BookingForm(props) {
  // date picker---------------------
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const changeHandler = function (value) {
    const { startDate: startD, endDate: endD } = value.selection;
    //need to correct the month
    const correctStart = new Date(
      `${startD.getMonth() + 1}/${startD.getDate()}/${startD.getFullYear()}`
    );
    const correctEnd = new Date(
      `${endD.getMonth() + 1}/${endD.getDate()}/${endD.getFullYear()}`
    );

    setStartDate(correctStart);
    setEndDate(correctEnd);

    return setSelection([value.selection]);
  };

  let dateString = "";
  if (endDate) {
    //the string value that form submit
    dateString = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()} to ${
      endDate.getMonth() + 1
    }/${endDate.getDate()}/${endDate.getFullYear()}`;
  }

  // user info--------------------------
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identity, setIdentity] = useState("");

  const fullnameChangeHandler = (event) => {
    setFullname(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };
  const identityChangeHandler = (event) => {
    setIdentity(event.target.value);
  };

  const loginUser = useRouteLoaderData("root");
  useEffect(() => {
    if (loginUser) {
      setFullname(loginUser.fullName);
      setEmail(loginUser.email);
      setPhone(loginUser.phoneNumber);
    }
  }, [loginUser]);
  // effect when pick date---------------
  const [roomList, setRoomList] = useState(props.rooms);
  useEffect(() => {
    setRoomList(props.rooms);
    //filter by date
    setRoomList((prev) =>
      prev.filter((r) => {
        if (r.updatedAt) {
          const updatedAt = new Date(r.updatedAt);
          return updatedAt.getTime() <= startDate.getTime();
        }
        if (r.createdAt) {
          const createdAt = new Date(r.createdAt);
          return createdAt.getTime() <= startDate.getTime();
        }
        return true;
      })
    );
  }, [startDate, endDate, props.rooms]);

  // calculate total -----------------------------------
  const [total, setTotal] = useState(0);
  const [roomBooked, setRoomBooked] = useState([]);
  const checkboxChangeHandler = (checked, roomIdentity, price) => {
    setRoomBooked((prev) => {
      if (checked) {
        return [...prev, { roomIdentity: roomIdentity, price: price }];
      } else {
        return prev.filter((r) => r.roomIdentity !== roomIdentity);
      }
    });
  };

  useEffect(() => {
    const dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (roomBooked !== [] && endDate) {
      const [sDay, eDay, sMonth, eMonth] = [
        startDate.getDate(),
        endDate.getDate(),
        startDate.getMonth(),
        endDate.getMonth(),
      ];
      const daysBooked =
        sMonth === eMonth
          ? eDay - sDay + 1
          : eDay - sDay + 1 + dayOfMonth[sMonth];
      setTotal(
        daysBooked *
          roomBooked.reduce((sum, room) => (sum += Number(room.price)), 0)
      );
    }
  }, [roomBooked, endDate, startDate]);
  //RENDER----------------------------------------------
  return (
    <article>
      <div className="container">
        <Form
          className={classes.form}
          action={`/detail/${props.hotelId}`}
          method="post"
        >
          <div className={`${classes.flex} ${classes.part}`}>
            {/* date picker ----------------------------------------- */}
            <div className={classes.date}>
              <h1>Dates</h1>
              <input type="hidden" value={dateString} name="date" />
              <DateRange
                className="date-picker"
                ranges={selection}
                onChange={changeHandler}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                portalId="root"
              />
            </div>
            {/* user info -------------------------------------------- */}
            <div className={classes.info}>
              <h1>Reserve Info</h1>

              <div className={classes["form-control"]}>
                <input
                  type="hidden"
                  name="userId"
                  value={loginUser ? loginUser._id : ""}
                />
                <label htmlFor="fullname">Your Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={fullnameChangeHandler}
                  required
                />
              </div>

              <div className={classes["form-control"]}>
                <label htmlFor="email">Your Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={emailChangeHandler}
                  required
                />
              </div>

              <div className={classes["form-control"]}>
                <label htmlFor="phone">Your Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={phoneChangeHandler}
                  required
                />
              </div>

              <div className={classes["form-control"]}>
                <label htmlFor="identity">Your Identity Card Number:</label>
                <input
                  type="text"
                  name="identity"
                  id="identity"
                  placeholder="Card Number"
                  value={identity}
                  onChange={identityChangeHandler}
                  required
                />
              </div>
            </div>
          </div>
          <div className={`${classes.rooms} ${classes.part}`}>
            <h1>Select Rooms</h1>
            <ul className={classes.roomList}>
              {roomList.map((room, i) => (
                <RoomCard
                  data={room}
                  key={i}
                  onChange={checkboxChangeHandler}
                />
              ))}
            </ul>
            <input
              type="hidden"
              name="rooms"
              value={JSON.stringify(roomBooked)}
            />
          </div>
          <div className={`${classes.payment} ${classes.part}`}>
            <h1>Total Bill: ${total}</h1>
            <input type="hidden" name="total" value={total} />
            <div className={classes.action}>
              <select name="payment" required>
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Master Card">Master Card</option>
              </select>
              <button type="submit" className={`btn cta-btn ${classes.btn}`}>
                Reserve Now
              </button>
            </div>
          </div>
        </Form>
      </div>
    </article>
  );
}
