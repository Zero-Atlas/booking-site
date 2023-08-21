import "./Detail.css";
import Photos from "./Content/Photos";
import Description from "./Content/Description";
import Combo from "./Content/Combo";
import Location from "./Content/Location";
import { json, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import BookingForm from "./BookingForm";

const Detail = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const detailData = useLoaderData();

  const showHandler = () => {
    setShowBookingForm((prev) => !prev);
  };
  return (
    <>
      <article id="detail">
        <div className="container">
          <Location
            name={detailData.name}
            address={detailData.address}
            distance={detailData.distance}
            price={detailData.cheapestPrice}
          />
          <Photos photos={detailData.photos} />
          <div className="info-wp">
            <Description title={detailData.title} desc={detailData.desc} />
            <Combo price={detailData.cheapestPrice} showHandler={showHandler} />
          </div>
        </div>
      </article>
      {showBookingForm && (
        <BookingForm rooms={detailData.rooms} hotelId={detailData._id} />
      )}
    </>
  );
};

export default Detail;

export async function loader({ params }) {
  const hotelId = params.hotelId;
  const response = await fetch(`http://localhost:5000/hotel/${hotelId}`);
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();
  return data;
}

export async function action({ request,params }) {
  const receive = await request.formData();
  // data receive from form
  const inputData = {
    dateString: receive.get("date"),
    rooms: JSON.parse(receive.get("rooms")),
    userId: receive.get("userId"),
    hotelId: params.hotelId,
    total: receive.get("total"),
    payment: receive.get("payment"),
  };

  console.log(inputData);

  const response = await fetch("http://localhost:5000/user/booked", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputData),
  });

  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }

  return redirect("/transaction");
}
