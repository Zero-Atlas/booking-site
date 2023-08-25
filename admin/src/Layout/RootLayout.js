import { Outlet, json } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export async function loader() {
  const adminId = JSON.parse(localStorage.getItem("loginAdmin"));
  const response = await fetch(`${process.env.REACT_APP_SERVER}admin`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminId: adminId }),
  });
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();
  return data;
}
