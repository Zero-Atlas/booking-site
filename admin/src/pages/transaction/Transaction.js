import { json, useLoaderData, useSearchParams } from "react-router-dom";

import classes from "./Transaction.module.css";

export default function Transaction(props) {
  let loaderData = useLoaderData();
  if(!loaderData){
    loaderData=props.data
  }
  let data, maxPage;
  if (loaderData) {
    [data, maxPage] = [loaderData.data, loaderData.maxPage];
  }
  const [searchParams, setSearchParams] = useSearchParams();
  let page = Number(searchParams.get("page")) || 1;
  const increasePage = () => {
    if (page < Number(maxPage)) {
      page++;
    }
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  const decreasePage = () => {
    if (page > 1) {
      page--;
    }
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <>
      <div className={classes.history}>
        <h2>{props.title?props.title:'Transaction List'}</h2>
        <div className={classes["table-wp"]}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>
                  <span>ID</span>
                </th>
                <th>
                  <span>User</span>
                </th>
                <th>
                  <span>Hotel</span>
                </th>
                <th>
                  <span>Room</span>
                </th>
                <th>
                  <span>Date</span>
                </th>
                <th>
                  <span>Price</span>
                </th>
                <th>
                  <span>Payment Method</span>
                </th>
                <th>
                  <span>Status</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((trans, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{trans._id}</td>
                    <td>{trans.username}</td>
                    <td>{trans.name}</td>
                    <td>{trans.room}</td>
                    <td>{trans.date}</td>
                    <td>${trans.price}</td>
                    <td>{trans.payment}</td>
                    {trans.status === "Booked" && (
                      <td className={classes.booked}>
                        <span>{trans.status}</span>
                      </td>
                    )}
                    {trans.status === "Checkin" && (
                      <td className={classes.checkin}>
                        <span>{trans.status}</span>
                      </td>
                    )}
                    {trans.status === "Checkout" && (
                      <td className={classes.checkout}>
                        <span>{trans.status}</span>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={classes.pagination}>
            <p>{`${page}-${maxPage} of ${maxPage}`}</p>
            <button onClick={decreasePage}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={increasePage}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader({ request }) {
  const adminId = JSON.parse(localStorage.getItem("loginAdmin"));
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const response = await fetch(
    `http://localhost:5000/admin/${adminId}/transaction?page=${page}`
  );
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();
  return data;
}
