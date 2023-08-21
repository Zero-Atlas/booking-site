import { Link, useLoaderData, useNavigate, redirect } from "react-router-dom";
import classes from "./Hotel.module.css";

export default function Hotel() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const deleteHandler = async (hotelId) => {
    if (window.confirm("Are you sure to delete this hotel?")) {
      const response = await fetch(
        `http://localhost:5000/admin/delete-hotel/${hotelId}`,
        { method: "delete" }
      );
      const data = await response.json();
      if (data.message === "deleted") {
        alert(`Hotel ${data.message}`);
        return navigate(0);
      } else {
        alert(`Cannot delete! This hotel is in a transaction!`);
      }
    }
  };

  const editHandler = (hotelId) => {
    return navigate(`/dashboard/hotel/new?edit=true&hotelId=${hotelId}`);
  };

  return (
    <>
      <div className={classes.hotels}>
        <div className={classes.head}>
          <h2>List Hotel</h2>
          <Link
            to="/dashboard/hotel/new"
            className={`${classes.btn} ${classes["new-btn"]}`}
          >
            Add New
          </Link>
        </div>
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
                  <span>Name</span>
                </th>
                <th>
                  <span>Type</span>
                </th>
                <th>
                  <span>Title</span>
                </th>
                <th>
                  <span>City</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((hotel, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{hotel._id}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.type}</td>
                    <td>{hotel.title}</td>
                    <td>{hotel.city}</td>
                    <td className={classes.action}>
                      <button
                        className={`${classes.btn} ${classes["delete-btn"]}`}
                        onClick={deleteHandler.bind(null, hotel._id)}
                      >
                        Delete
                      </button>
                      <button
                        className={`${classes.btn} ${classes["edit-btn"]}`}
                        onClick={editHandler.bind(null, hotel._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export async function loader() {
  const adminId = JSON.parse(localStorage.getItem("loginAdmin"));
  const response = await fetch(`http://localhost:5000/admin/${adminId}/hotel`);
  if (!response.ok) {
    const error = await response.json();
    console.log(response.status, error.message);
    return redirect("/logout");
  }
  const data = await response.json();
  return data;
}
