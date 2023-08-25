import { Outlet, json } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";

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
    console.error("Fail to fetch",500);
    return null
  }
  const data = await response.json();
  return data;
}
