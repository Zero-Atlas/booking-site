import { Form, redirect, useLoaderData } from "react-router-dom";
import classes from "./HotelForm.module.css";
import Input from "../../../util/Input";
import process from "process";
import { useState } from "react";

export default function HotelForm() {
  const data = useLoaderData();
  let photoList = "";
  if (data) {
    photoList = data.photos.join(", ");
  }
  const [photos, setPhotos] = useState(photoList);
  const photosChangeHandler = (event) => {
    setPhotos(event.target.value);
  };

  return (
    <>
      <div className={`${classes.card} ${classes.title}`}>Add new Product</div>
      <Form
        className={`${classes.card} ${classes.form}`}
        method="post"
        action="/dashboard/hotel/new"
      >
        <div className={classes["form-control"]}>
          <label>Name</label>
          <Input
            type="text"
            name="name"
            required={true}
            placeholder="My Hotel"
            init={data ? data.name : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Type</label>
          <select name="type">
            <option
              selected={data ? data.type === "hotel" : true}
              value="hotel"
            >
              Hotel
            </option>
            <option
              selected={data ? data.type === "resort" : false}
              value="resort"
            >
              Resort
            </option>
            <option
              selected={data ? data.type === "apartment" : false}
              value="apartment"
            >
              Apartment
            </option>
            <option
              selected={data ? data.type === "villa" : false}
              value="villa"
            >
              Villa
            </option>
            <option
              selected={data ? data.type === "cabin" : false}
              value="cabin"
            >
              Cabin
            </option>
          </select>
          {/* <Input
            type="text"
            name="type"
            required
            placeholder="hotel"
            init={data ? data.type : ""}
          /> */}
        </div>
        <div className={classes["form-control"]}>
          <label>City</label>
          <Input
            type="text"
            name="city"
            required
            placeholder="New York"
            init={data ? data.city : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Address</label>
          <Input
            type="text"
            name="address"
            required
            placeholder="elton st, 216"
            init={data ? data.address : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Distance from City Center</label>
          <Input
            type="text"
            name="distance"
            required
            placeholder="500"
            init={data ? data.distance : ""}
          />
        </div>

        <div className={classes["form-control"]}>
          <label>Title</label>
          <Input
            type="text"
            name="title"
            required
            placeholder="The best Hotel"
            init={data ? data.title : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Description</label>
          <Input
            type="text"
            name="desc"
            required
            placeholder="description"
            init={data ? data.desc : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Price</label>
          <Input
            type="number"
            name="cheapestPrice"
            step="1"
            required
            placeholder="100"
            init={data ? data.cheapestPrice : ""}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Image</label>
          <textarea
            type="text"
            name="photos"
            required
            placeholder="Seperate image URL with comma + whitespace, example: url1, url2."
            value={photos}
            onChange={photosChangeHandler}
          />
        </div>
        <div className={`${classes.feature} ${classes["form-control"]}`}>
          <label>Feature</label>
          <select name="featured">
            <option value="false">No</option>
            <option
              value="true"
              selected={data && data.featured === "true" ? true : false}
            >
              Yes
            </option>
          </select>
        </div>
        <div className={`${classes.rooms} ${classes["form-control"]}`}>
          <label>Rooms</label>
          <textarea
            name="rooms"
            rows="4"
            defaultValue={`2 Bed Room \n 1 Bed Room \n Basement Double Room \n Superior Basement Room \n Deluxe Room`}
          />
        </div>
        <input type="hidden" name="edit" value={data ? "true" : "false"} />
        <input type="hidden" name="hotelId" value={data ? data._id : ""} />
        <button className={classes.btn} type="submit">
          Send
        </button>
      </Form>
    </>
  );
}

export async function action({ request }) {
  const adminId = JSON.parse(localStorage.getItem("loginAdmin"));

  const receive = await request.formData();
  const sendData = {
    address: receive.get("address"),
    type: receive.get("type"),
    city: receive.get("city"),
    cheapestPrice: receive.get("cheapestPrice"),
    desc: receive.get("desc"),
    distance: receive.get("distance"),
    featured: receive.get("featured"),
    name: receive.get("name"),
    title: receive.get("title"),
    photos: receive.get("photos"),
    edit: receive.get("edit"),
    hotelId: receive.get("hotelId"),
  };

  let response;
  if (sendData.edit === "false") {
    response = await fetch(`${process.env.REACT_APP_SERVER}/admin/${adminId}/hotel/new`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });
  } else {
    response = await fetch(
      `${process.env.REACT_APP_SERVER}/admin/${adminId}/hotel/update`,
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
  return redirect("/dashboard/hotel");
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const edit = url.searchParams.get("edit");

  if (edit) {
    const hotelId = url.searchParams.get("hotelId");
    const response = await fetch(`${process.env.REACT_APP_SERVER}/hotel/${hotelId}`);
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
