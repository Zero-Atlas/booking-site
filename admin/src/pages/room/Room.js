import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import process from 'process'
import classes from "./Room.module.css";

export default function Room() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const deleteHandler = async (roomId) => {
    const adminId = JSON.parse(localStorage.getItem("loginAdmin"));
    if (window.confirm("Are you sure to delete this hotel?")) {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/${adminId}/delete-room/${roomId}`,
        { method: "delete" }
      );
      const data = await response.json();
      if (data.message === "deleted") {
        alert(`Room ${data.message}`);
        return navigate(0);
      } else {
        alert(`Cannot delete! This room is in a transaction!`);
      }
    }
  };
  const editHandler = async (roomId) => {
    return navigate(`/dashboard/room/new?edit=true&roomId=${roomId}`);
  };

  return (
    <>
      <div className={classes.rooms}>
        <div className={classes.head}>
          <h2>List Room</h2>
          <Link
            to="/dashboard/room/new"
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
                  <span>Title</span>
                </th>
                <th>
                  <span>Description</span>
                </th>
                <th>
                  <span>Price</span>
                </th>
                <th>
                  <span>Max People</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((room, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{room._id}</td>
                    <td>{room.title}</td>
                    <td className={classes.desc}>{room.desc}</td>
                    <td>{room.price}</td>
                    <td>{room.maxPeople}</td>
                    <td className={classes.action}>
                      <button
                        className={`${classes.btn} ${classes["delete-btn"]}`}
                        onClick={deleteHandler.bind(null, room._id)}
                      >
                        Delete
                      </button>
                      <button
                        className={`${classes.btn} ${classes["edit-btn"]}`}
                        onClick={editHandler.bind(null, room._id)}
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
  const response = await fetch(`${process.env.REACT_APP_SERVER}/admin/${adminId}/room`);
  if (!response.ok) {
    const error = await response.json();
    console.log(response.status, error.message);
    return redirect("/logout");
  }
  const data = await response.json();
  return data;
}
