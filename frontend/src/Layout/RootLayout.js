import { Outlet, json } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import process from "process";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Register />
      <Footer />
    </>
  );
}

export async function loader() {
  const userId = JSON.parse(localStorage.getItem("loginUser"));
  const response = await fetch(`${process.env.REACT_APP_SERVER}/user`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId }),
  });
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();
  return data;
}
