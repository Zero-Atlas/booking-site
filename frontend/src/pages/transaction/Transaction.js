import { json, redirect, useLoaderData } from "react-router-dom";

import classes from "./Transaction.module.css";

export default function Transaction() {
  const data = useLoaderData();
  return (
    <article id="transaction">
      <div className="container">
        <h1 className={classes.title}>Your Transaction</h1>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((trans, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{trans.name}</td>
                <td>{trans.room}</td>
                <td>{trans.date}</td>
                <td>${trans.price}</td>
                <td>{trans.payment}</td>
                {trans.status==='Booked'&&<td className={classes.booked}><span>{trans.status}</span></td>}
                {trans.status==='Checkin'&&<td className={classes.checkin}><span>{trans.status}</span></td>}
                {trans.status==='Checkout'&&<td className={classes.checkout}><span>{trans.status}</span></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export async function loader() {
  const loginUserId = JSON.parse(localStorage.getItem("loginUser"));
  if (!loginUserId) {
    return redirect("/login");
  }
  const response = await fetch(
    `http://localhost:5000/transaction/${loginUserId}`
  );
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }

  const data = await response.json();
  return data;
}
