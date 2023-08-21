import {
  Form,
  redirect,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import classes from "./RoomForm.module.css";
import Input from "../../../util/Input";

export default function RoomForm() {
  let data = useLoaderData();
  const hotelList = useRouteLoaderData("dashboard");
  let roomNumbers = "";
  if (data) {
    roomNumbers = data.roomNumbers.join(", ");
  } else data = { _id: "" };

  return (
    <>
      <div className={`${classes.card} ${classes.title}`}>Add new Room</div>
      <Form
        className={`${classes.card} ${classes.form}`}
        method="post"
        action={`/dashboard/room/new?edit=${data._id ? "true" : "false"}`}
      >
        <div className={classes["form-control"]}>
          <label>Title</label>
          <Input
            type="text"
            name="title"
            required
            placeholder="2 bed room"
            init={data ? data.title : ""}
          />
        </div>

        <div className={classes["form-control"]}>
          <label>Description</label>
          <Input
            type="text"
            name="desc"
            required
            placeholder="King size bed, 1 bathroom"
            init={data ? data.desc : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Price</label>
          <Input
            type="number"
            name="price"
            step="1"
            required
            placeholder="100"
            init={data ? data.price : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Max People</label>
          <Input
            type="number"
            name="maxPeople"
            step="1"
            required
            placeholder="2"
            init={data ? data.maxPeople : ""}
          />
        </div>

        <div className={classes["last-row"]}>
          <div className={classes["form-control"]}>
            <label>Rooms</label>
            <textarea
              type="text"
              name="roomNumbers"
              required
              placeholder="Give comma between room numbers."
              defaultValue={data ? roomNumbers : ""}
            />
          </div>
          <div className={`${classes.hotel} ${classes["form-control"]}`}>
            <label>Choose a hotel</label>
            <select name="hotelId">
              {hotelList &&
                hotelList.map((hotel) => (
                  <option
                    key={hotel._id}
                    value={hotel._id}
                    selected={hotel.rooms.includes(data._id) ? true : false}
                  >
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>

          <input type="hidden" name="roomId" value={data ? data._id : ""} />
          <button className={classes.btn} type="submit">
            Send
          </button>
        </div>
      </Form>
    </>
  );
}

export async function action({ request }) {
  const adminId = JSON.parse(localStorage.getItem("loginAdmin"));
  const receive = await request.formData();
  const url = new URL(request.url);
  const sendData = {
    price: receive.get("price"),
    desc: receive.get("desc"),
    hotelId: receive.get("hotelId"),
    title: receive.get("title"),
    roomNumbers: receive.get("roomNumbers"),
    maxPeople: receive.get("maxPeople"),
    edit: url.searchParams.get("edit"),
    roomId: receive.get("roomId"),
  };

  let response;
  if (sendData.edit === "false") {
    response = await fetch(
      `${process.env.REACT_APP_SERVER}/admin/${adminId}/room/new`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      }
    );
  } else {
    response = await fetch(
      `${process.env.REACT_APP_SERVER}/admin/${adminId}/room/update`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      }
    );
  }

  if (!response.ok) {
    const error = await response.json();
    console.log(response.status, error.message);
    return redirect("/logout");
  }
  return redirect("/dashboard/rooms");
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const edit = url.searchParams.get("edit");

  if (edit) {
    const roomId = url.searchParams.get("roomId");
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/room/${roomId}`
    );
    if (!response.ok) {
      const error = await response.json();
      console.log(response.status, error.message);
      return redirect("/logout");
    }
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}
